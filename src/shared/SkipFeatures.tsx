import { defineComponent, PropType } from "vue";
import { RouterLink } from "vue-router";

export const SkipFeatures = defineComponent({
  setup: (props, context) => {
    const handleSkip = () => {
      localStorage.setItem("skipFeatures", "yes");
    };

    return () => (
      <span onClick={() => handleSkip()}>
        <RouterLink to="/start">跳过</RouterLink>
      </span>
    );
  },
});
