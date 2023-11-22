import { defineComponent } from "vue";
import s from "./welcome.module.scss";
import clock from "../../assets/icons/clock.svg"

export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.card}>
        <img src={clock} />
        <h3>每日提醒<br />不遗漏每一笔账单</h3>
      </div>
    );
  },
}); 
