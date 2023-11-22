import { defineComponent } from "vue";
import s from "./welcome.module.scss";

export const Third = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.card}>
        <svg>
          <use xlinkHref='#chart'></use>
        </svg>
        <h3>数据可视化<br />收支一目了然</h3>
      </div>
    );
  },
}); 
