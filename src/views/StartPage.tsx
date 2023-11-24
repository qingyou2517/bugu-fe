import { defineComponent, PropType, reactive, ref } from 'vue';
import s from './StartPage.module.scss';
import { Button, ConfigProvider, ConfigProviderThemeVars } from 'vant';
import { FloatButton } from '../shared/FloatButton';
import { Center } from "../shared/Center"
import { Icon } from '../shared/Icon';
import { NavBar } from '../shared/NavBar';
import { Overlay } from '../shared/Overlay';
import { MainLayout } from '../layouts/MainLayout';
import { RouterLink } from 'vue-router';

export const StartPage = defineComponent({
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

    // 侧边导航栏与遮罩层
    const overlayVisible = ref(false)
    const handleClickMenu = () => {
      overlayVisible.value = !overlayVisible.value
    }
    const handleClose = () => {
      overlayVisible.value = false
    }
    return () => (
      <MainLayout>{
        {
          icon: () => <Icon name="menu" class={s.navIcon} onClick={handleClickMenu}></Icon>,
          title: () => "青游记账",
          default: () => <>
            <Center class={s.pig_wrapper}>
              <Icon name="pig" class={s.pig}></Icon>
            </Center>
            <div class={s.button_wrapper}>
              <ConfigProvider theme-vars={themeVars}  >
                <RouterLink to="/items/create">
                  <Button round type="primary" class={s.button}>开始记账</Button>
                </RouterLink>
              </ConfigProvider>
            </div>
            <RouterLink to="/items/create">
              <FloatButton iconName="add" />
            </RouterLink>
            {overlayVisible.value && <Overlay onClose={handleClose} />}
          </>
        }
      }
      </MainLayout>
    )
  }
})