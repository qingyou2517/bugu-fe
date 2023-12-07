import s from "./welcome.module.scss";
import { RouterLink } from "vue-router";
import { defineComponent } from "vue";
import { SkipFeatures } from "../../shared/SkipFeatures";

export const FirstAction = defineComponent({
  setup: () => {
    return () => (
      <div class={s.actions}>
        <SkipFeatures class={s.hide}></SkipFeatures>
        <RouterLink to="/welcome/2">下一页</RouterLink>
        <SkipFeatures></SkipFeatures>
      </div>
    );
  },
});
