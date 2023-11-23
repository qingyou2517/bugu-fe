import { defineComponent, PropType } from 'vue';
import s from './Center.module.scss';

// 表驱动编程：flex 布局方向为水平/垂直
const directionMap = {
  "-": "horizontal",
  "|": "vertical",
  "horizontal": "horizontal",
  "vertical": "vertical"
}
export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<"-" | "|" | "horizontal" | "vertical">,
      default: "-",
    }
  },
  setup: (props, context) => {
    const extraClass = directionMap[props.direction]

    return () => (
      <div class={[s.center, extraClass]}>
        {context.slots.default?.()}
      </div>
    )
  }
})