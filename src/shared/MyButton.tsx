import { defineComponent, PropType, reactive } from 'vue';
import s from "./MyButton.module.scss"
import { Button, ConfigProvider, ConfigProviderThemeVars } from 'vant';

export const MyButton = defineComponent({
  props: {
    kind: {
      type: String as PropType<"" | "danger">,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function as PropType<(e: TouchEvent) => void>
    }
  },
  setup: (props, context) => {
    // 修改 vant 按钮默认样式变量
    // 1. 默认按钮样式：确认、登录、保存
    const root = document.documentElement
    const button_bg = getComputedStyle(root).getPropertyValue('--button-bg').trim()
    const button_h = getComputedStyle(root).getPropertyValue('--button-height').trim()
    const button_text_size = getComputedStyle(root).getPropertyValue('--button-font-size').trim()
    const themeVars1: ConfigProviderThemeVars = reactive({
      buttonPrimaryBackground: button_bg,
      buttonPrimaryBorderColor: button_bg,
      buttonNormalFontSize: button_text_size,
      buttonDefaultHeight: button_h,
    })
    // 2. 危险操作的按钮样式：删除
    const button_bg_danger = getComputedStyle(root).getPropertyValue('--button-bg-danger').trim()
    const themeVars2: ConfigProviderThemeVars = reactive({
      buttonPrimaryBackground: button_bg_danger,
      buttonPrimaryBorderColor: button_bg_danger,
      buttonNormalFontSize: button_text_size,
      buttonDefaultHeight: button_h
    })
    return () => (
      <div class={s.button_wrapper}>
        <ConfigProvider theme-vars={props.kind ? themeVars2 : themeVars1}  >
          <Button round type="primary" class={s.button}
            disabled={props.disabled}
            onClick={props.onClick}
          >
            {context.slots.default?.()}
          </Button>
        </ConfigProvider>
      </div>
    )
  }
})