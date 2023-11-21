import { defineComponent } from "vue";
import s from "./First.module.scss";
import cloud from "../../assets/icons/cloud.svg"
import { RouterLink } from "vue-router";

export const Third = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.icon} src={cloud} />
          <h3>数据可视化<br />收支一目了然</h3>
        </div>
        <div class={s.actions}>
          <span class={s.hide}>跳过</span>
          <RouterLink to="/welcome/4" class={s.next}>下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    );
  },
}); 
