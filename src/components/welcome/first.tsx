import { defineComponent } from "vue";
import s from "./WelcomeLayout.module.scss";
import pig from "../../assets/icons/pig.svg"
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";

export const First = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          icon: () => <img src={pig} />,
          title: () => <h3>会挣钱<br />也要会省钱</h3>,
          buttons: () => <>
            <span class={s.hide}>跳过</span>
            <RouterLink to="/welcome/2">下一页</RouterLink>
            <RouterLink to="/start">跳过</RouterLink>
          </>
        }}
      </WelcomeLayout>
    );
  },
}); 
