import { defineComponent, PropType } from 'vue';
import s from './StatisticsPage.module.scss';

export const StatisticsPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>统计页面</div>
    )
  }
})