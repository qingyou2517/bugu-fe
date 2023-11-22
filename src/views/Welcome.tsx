import { defineComponent, Transition, VNode } from "vue";
import { RouterView, RouteLocationNormalizedLoaded } from "vue-router";
import s from "./Welcome.module.scss";
import logo from "../assets/icons/bugu.svg";

export const Welcome = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <header>
          <img src={logo} />
          <h1>青游记账</h1>
        </header>
        <main class={s.main}>
          <RouterView name="main">
            {
              ({ Component: X, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
                <Transition
                  enterFromClass={s.slide_fade_enter_from}
                  enterActiveClass={s.slide_fade_enter_active}
                  leaveToClass={s.slide_fade_leave_to}
                  leaveActiveClass={s.slide_fade_leave_active}
                >
                  {X}
                </Transition>
            }
          </RouterView>
        </main>
        <footer>
          <RouterView name="footer" />
        </footer>
      </div>
    );
  },
});
