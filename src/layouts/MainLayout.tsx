import { defineComponent, PropType } from 'vue';
import { NavBar } from '../shared/NavBar';

export const MainLayout = defineComponent({
  setup: (props, context) => {
    return () => (
      <div>
        <NavBar>{
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