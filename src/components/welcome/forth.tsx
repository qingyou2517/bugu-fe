import { defineComponent } from "vue";
import s from "./WelcomeLayout.module.scss";
import cloud from "../../assets/icons/cloud.svg"
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";

export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          icon: () => <img src={cloud} />,
          title: () => <h3>云备份<br />再也不丢失数据</h3>,
          buttons: () => <>
            <RouterLink to="/start" class={s.start}>开启应用</RouterLink>
          </>
        }}
      </WelcomeLayout>
    );
  },
}); 
