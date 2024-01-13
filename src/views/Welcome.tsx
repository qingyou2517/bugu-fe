import { defineComponent, Transition, VNode, ref, watchEffect } from "vue";
import {
  RouterView,
  RouteLocationNormalizedLoaded,
  useRouter,
  useRoute,
} from "vue-router";
import s from "./Welcome.module.scss";
import { useSwipe } from "../hooks/useSwipe";
import { throttle } from "../shared/throttle";

const pushMap: Record<string, string> = {
  Welcome1: "/welcome/2",
  Welcome2: "/welcome/3",
  Welcome3: "/welcome/4",
  Welcome4: "/start",
};

export const Welcome = defineComponent({
  setup: (props, context) => {
    const mainRef = ref<HTMLDivElement>();
    const router = useRouter();
    const routes = useRoute();

    const { swiping, direction, distance } = useSwipe(mainRef, {
      beforeStart: (e) => e.preventDefault(),
    });
    const push = throttle(() => {
      // 节流
      let name = routes.name!.toString();
      router.push(pushMap[name]);
    }, 500);
    watchEffect(() => {
      if (swiping.value && direction.value === "left") {
        push();
      }
    });
    return () => (
      <div class={s.wrapper}>
        <header>
          <svg>
            <use xlinkHref="#bugu"></use>
          </svg>
          <h1>青游记账</h1>
        </header>
        <main class={s.main} ref={mainRef}>
          <RouterView name="main">
            {({
              Component: X,
              route: R,
            }: {
              Component: VNode;
              route: RouteLocationNormalizedLoaded;
            }) => (
              <Transition
                enterFromClass={s.slide_fade_enter_from}
                enterActiveClass={s.slide_fade_enter_active}
                leaveToClass={s.slide_fade_leave_to}
                leaveActiveClass={s.slide_fade_leave_active}
              >
                {X}
              </Transition>
            )}
          </RouterView>
        </main>
        <footer>
          <RouterView name="footer" />
        </footer>
      </div>
    );
  },
});

export default Welcome;
