import { defineComponent, PropType } from "vue";
import s from "./Charts.module.scss";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { Bars } from "./Bars";

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      // required: true
    },
    endDate: {
      type: String as PropType<string>,
      // required: true
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <LineChart />
        <PieChart />
        <Bars />
      </div>
    );
  },
});
