import { defineComponent, PropType } from 'vue';
import s from './ComingSoon.module.scss';

export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>正在开发中...</div>
    )
  }
})