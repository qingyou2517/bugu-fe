import { defineComponent } from "vue";
import s from "./welcome.module.scss";

export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.card}>
        <svg>
          <use xlinkHref='#clock'></use>
        </svg>
        <h3>每日提醒<br />不遗漏每一笔账单</h3>
      </div>
    );
  },
}); 
