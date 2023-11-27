import { defineComponent, PropType } from 'vue';
import s from './EmojiSelect.module.scss';

export const EmojiSelect = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>emojis</div>
    )
  }
})