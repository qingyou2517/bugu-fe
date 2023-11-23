import { defineComponent, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import s from "./welcome.module.scss";
import { useSwipe } from '../../hooks/useSwipe';

export const First = defineComponent({
  setup: (props, context) => {
    const divRef = ref<HTMLDivElement>()
    const router = useRouter()

    const { swiping, direction, distance } = useSwipe(divRef)
    watchEffect(() => {
      if (swiping.value && direction.value === 'left') {
        if (distance.value?.x && distance.value?.x < -10) {
          router.push("/welcome/2")
        }
      }
    })

    return () => (
      <div class={s.card} ref={divRef}>
        <svg>
          <use xlinkHref='#pig'></use>
        </svg>
        <h3>会挣钱<br />还会省钱</h3>
      </div>
    );
  },
}); 
