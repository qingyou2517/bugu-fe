import { defineComponent, PropType, reactive } from 'vue';
import s from './StartPage.module.scss';
import { Button, ConfigProvider, ConfigProviderThemeVars } from 'vant';
import { FloatButton } from '../shared/FloatButton';
import { Center } from "../shared/Center"
import { Icon } from '../shared/Icon';
import { NavBar } from '../shared/NavBar';

export const StartPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, { slots }) => {
    // 修改 vant 组件默认样式变量
    const root = document.documentElement
    const button_bg = getComputedStyle(root).getPropertyValue('--button-bg').trim()
    const button_h = getComputedStyle(root).getPropertyValue('--button-height').trim()
    const button_text_size = getComputedStyle(root).getPropertyValue('--button-font-size').trim()
    const themeVars: ConfigProviderThemeVars = reactive({
      buttonPrimaryBackground: button_bg,
      buttonNormalFontSize: button_text_size,
      buttonDefaultHeight: button_h
    })

    return () => (
      <>
        <NavBar>{
          {
            icon: () => <Icon name="menu" class={s.navIcon}></Icon>,
            default: () => "青游记账"
          }
        }
        </NavBar>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig}></Icon>
        </Center>
        <div class={s.button_wrapper}>
          <ConfigProvider theme-vars={themeVars}  >
            <Button round type="primary" class={s.button}>开始记账</Button>
          </ConfigProvider>
        </div>
        <FloatButton iconName="add" />
      </>
    )
  }
})