import s from "./welcome.module.scss";
import { RouterLink } from "vue-router";
import { defineComponent } from "vue";
import { SkipFeatures } from "../../shared/SkipFeatures";

export const ForthAction = defineComponent({
  setup: () => {
    const handleSkip = () => {
      localStorage.setItem("skipFeatures", "yes");
    };

    return () => (
      <div class={s.actions}>
        <SkipFeatures class={s.hide}></SkipFeatures>
        <span onClick={() => handleSkip()}>
          <RouterLink to="/start">进入首页</RouterLink>
        </span>
        <SkipFeatures class={s.hide}></SkipFeatures>
      </div>
    );
  },
});
