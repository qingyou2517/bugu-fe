import { defineComponent } from "vue";
import s from "./welcome.module.scss";
import chart from "../../assets/icons/chart.svg"

export const Third = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.card}>
        <img src={chart} />
        <h3>数据可视化<br />收支一目了然</h3>
      </div>
    );
  },
}); 
