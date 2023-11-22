import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
import { defineComponent } from 'vue';

export const FirstAction = defineComponent({
  setup: () => {
    return () => (
      <div class={s.actions}>
        <RouterLink class={s.hide} to="/start" >跳过</RouterLink>
        <RouterLink to="/welcome/2" >下一页</RouterLink>
        <RouterLink to="/start" >跳过</RouterLink>
      </div>
    )
  }
})