import {
  PropType,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import s from "./PieChart.module.scss";
import * as echarts from "echarts";
import { EChartsType } from "echarts";
import { amountFormat } from "../../shared/format";

export const PieChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<{ name: string; value: number }[]>,
    },
  },
  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>(); // dom 容器
    let myChart: EChartsType;

    // 公共配置项
    const echartsOption = {
      tooltip: {
        confine: true, // 防止 tooltip 提示文本超出画布
        trigger: "item",
        formatter: (x: { name: string; value: number; percent: number }) => {
          const { name, value, percent } = x;
          return `${name}: ￥${amountFormat(value)} 占比 ${percent}%`;
        },
      },
      grid: [{ left: 0, top: 20, right: 0, bottom: 20 }],
      series: [
        {
          type: "pie",
          radius: "70%",
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    onMounted(async () => {
      if (refDiv.value === undefined) return;
      await nextTick();
      myChart = echarts.init(refDiv.value);

      myChart.setOption(echartsOption); // 绘制图表
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    });
    onBeforeUnmount(() => {
      if (myChart) echarts.dispose(myChart);
    });

    // data 变化时，重新setOption
    watch(
      () => props.data,
      () => {
        myChart.setOption({
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
