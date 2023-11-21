import { defineComponent } from 'vue';
import s from "./Start.module.scss"

export const Start = defineComponent({
  setup: (props, context) => {
    return () => (
      <div>开始记账</div>
    )
  }
})