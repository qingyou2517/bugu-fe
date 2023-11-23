import { PropType, defineComponent } from 'vue';
import s from './FloatButton.module.scss';
import { Icon } from './Icon';


export const FloatButton = defineComponent({
  props: {
    iconName: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.floatButton}>
        <Icon name={props.iconName} class={s.icon} />
      </div>
    )
  }
})