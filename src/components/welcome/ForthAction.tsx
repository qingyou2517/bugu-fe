import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
import { defineComponent } from 'vue';

export const ForthAction = defineComponent({
  setup: () => {
    return () => (
      <div class={s.actions}>
        <RouterLink class={s.hide} to="/start" >跳过</RouterLink>
        <RouterLink to="/start" >进入</RouterLink>
        <RouterLink class={s.hide} to="/start" >跳过</RouterLink>
      </div>
    )
  }
})

