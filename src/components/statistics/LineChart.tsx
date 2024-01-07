import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  watch,
} from "vue";
import s from "./LineChart.module.scss";
import * as echarts from "echarts";
import { EChartsType } from "echarts";
import dayjs from "dayjs";
import { amountFormat } from "../../shared/format";

export const LineChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<[string, number][]>,
    },
    showByDay: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>(); // dom 容器
    let myChart: EChartsType;

    // 公共配置项：不超过31天时，显示每一天；超过31天，显示月份
    const echartsOption = {
      tooltip: {
        show: true,
        trigger: "axis",
        formatter: ([item]: any) => {
          const [x, y] = item.data;
          if (props.showByDay) {
            return `${dayjs(new Date(x)).format("YYYY-MM-DD")} ￥${amountFormat(
              y
            )}`;
          } else {
            return `${dayjs(new Date(x)).format("YYYY-MM")} ￥${amountFormat(
              y
            )}`;
          }
        },
      },
      grid: props.showByDay
        ? [{ left: 0, top: 20, right: 0, bottom: 20 }]
        : [{ left: 0, top: 20, right: 0, bottom: 45 }],
      xAxis: {
        type: "time",
        boundaryGap: props.showByDay ? ["2%", "1%"] : ["2%", "2%"],
        axisLabel: {
          formatter: (value: string, index: number) => {
            if (props.showByDay) {
              return dayjs(new Date(value)).format("MM-DD");
            } else {
              return index % 2 === 0
                ? dayjs(new Date(value)).format("YYYY-MM")
                : "";
            }
          },
          rotate: props.showByDay ? 0 : 40,
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        show: true,
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
          },
        },
        axisLabel: {
          show: false,
        },
      },
    };

    onMounted(async () => {
      // 初始化容器
      if (refDiv.value === undefined) return;
      await nextTick();
      myChart = echarts.init(refDiv.value);
      window.addEventListener("resize", async function () {
        myChart.resize();
      });
      // 绘制图表
      myChart.setOption({
        ...echartsOption,
        series: [
          {
            data: props.data,
            type: "line",
            symbolSize: 6,
          },
        ],
      });
    });

    onBeforeUnmount(() => {
      if (myChart) echarts.dispose(myChart);
    });

    // 修复get数据后，图表空白的问题：watch监听data，若data更新，则重新resize、setOption
    watch(
      () => props.data,
      () => {
        myChart.resize();
        myChart.setOption({
          grid: props.showByDay
            ? [{ left: 0, top: 20, right: 0, bottom: 20 }]
            : [{ left: 0, top: 20, right: 0, bottom: 45 }],
          xAxis: {
            axisLabel: {
              rotate: props.showByDay ? 0 : 40,
            },
          },
          series: [
            {
              data: props.data,
            },
          ],
        });
      }
    );

    return () => <div ref={refDiv} class={s.wrapper}></div>;
  },
});
