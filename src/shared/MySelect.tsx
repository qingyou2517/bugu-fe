import { defineComponent, PropType } from "vue";
import s from "./MySelect.module.scss";

export const MySelect = defineComponent({
  props: {
    options: {
      type: Array as PropType<Array<{ value: string; text: string }>>,
    },
    modelValue: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const handleSelect = (value: string) => {
      context.emit("update:modelValue", value);
    };

    return () => (
      <label class={s.wrapper}>
        <span class={s.title}>类型</span>
        <select
          class={s.select}
          value={props.modelValue}
          onChange={(e: any) => handleSelect(e.target.value)}
        >
          {props.options?.map((option) => (
            <option value={option.value}>{option.text}</option>
          ))}
        </select>
      </label>
    );
  },
});
