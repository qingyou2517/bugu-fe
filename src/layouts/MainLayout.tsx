import { defineComponent, PropType } from 'vue';
import { NavBar } from '../shared/NavBar';
import s from "./MainLayout.module.scss"

export const MainLayout = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <NavBar class={s.navbar}>{
          {
            default: () => context.slots.title?.(),
            icon: () => context.slots.icon?.(),
          }
        }</NavBar>
        {context.slots.default?.()}
      </div>
    )
  }
})