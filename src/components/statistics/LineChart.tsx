import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
} from "vue";
import s from "./LineChart.module.scss";
import * as echarts from "echarts";
import { EChartsType } from "echarts";

export const LineChart = defineComponent({
  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>(); // dom 容器
    let myChart: EChartsType;
    onMounted(async () => {
      if (refDiv.value === undefined) return;
      await nextTick();
      myChart = echarts.init(refDiv.value);
      window.addEventListener("resize", function () {
        myChart.resize();
      });

      // 绘制图表
      myChart.setOption({
        grid: [{ left: 30, top: 10, right: 0, bottom: 20 }],
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      });
    });
    onBeforeUnmount(() => {
      if (myChart) echarts.dispose(myChart);
    });
    return () => <div ref={refDiv} class={s.wrapper}></div>;
  },
});
