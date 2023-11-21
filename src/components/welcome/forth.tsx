import { defineComponent } from "vue";
import s from "./First.module.scss";
import chart from "../../assets/icons/chart.svg"
import { RouterLink } from "vue-router";

export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.icon} src={chart} />
          <h3>云备份<br />再也不丢失数据</h3>
        </div>
        <div class={s.actions}>
          <RouterLink to="/welcome/4" class={s.next}>开启应用</RouterLink>
        </div>
      </div>
    );
  },
}); 
