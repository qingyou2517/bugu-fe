import { defineComponent } from "vue";
import s from "./First.module.scss";
import pig from "../../assets/icons/pig.svg"
import { RouterLink } from "vue-router";

export const First = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={pig}  />
          <h2>会挣钱<br/>也会省钱</h2>
        </div>
        <div class={s.actions}>
          <span class={s.hide}>跳过</span>
          <RouterLink to="/welcome/2"  class={s.next}>下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    );
  },
}); 