import { defineComponent } from "vue";
import s from "./WelcomeLayout.module.scss";
import clock from "../../assets/icons/clock.svg"
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";

export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          icon: () => <img src={clock} />,
          title: () => <h3>每日提醒<br />不遗漏每一笔账单</h3>,
          buttons: () => <>
            <span class={s.hide}>跳过</span>
            <RouterLink to="/welcome/3">下一页</RouterLink>
            <RouterLink to="/start">跳过</RouterLink>
          </>
        }}
      </WelcomeLayout>
    );
  },
}); 
