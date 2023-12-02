import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import s from "./PieChart.module.scss";
import * as echarts from "echarts";
import { EChartsType } from "echarts";

export const PieChart = defineComponent({
  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>(); // dom 容器
    let myChart: EChartsType;
    onMounted(async () => {
      if (refDiv.value === undefined) return;
      await nextTick();
      myChart = echarts.init(refDiv.value);

      const option = {
        grid: [{ left: 0, top: 0, right: 0, bottom: 20 }],
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
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
      myChart.setOption(option); // 绘制图表
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    });
    onBeforeUnmount(() => {
      if (myChart) echarts.dispose(myChart);
    });
    return () => <div ref={refDiv} class={s.wrapper}></div>;
  },
});
