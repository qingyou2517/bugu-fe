import { defineComponent, PropType, ref } from 'vue';
import s from './ItemList.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from 'vant';
import { Overlay } from '../../shared/Overlay';
import { ItemSummary } from './ItemSummary';
import { RouterLink } from 'vue-router';
import { FloatButton } from '../../shared/FloatButton';

export const ItemList = defineComponent({
  setup: (props, context) => {
    // 侧边导航栏与遮罩层
    const overlayVisible = ref(false)
    const handleClickMenu = () => {
      overlayVisible.value = !overlayVisible.value
    }
    const handleClose = () => {
      overlayVisible.value = false
    }

    //tab 切换
    const active = ref(0)
    return () => (
      <MainLayout>{{
        title: () => '青游记账',
        icon: () => <Icon name="menu" class={s.navIcon} onClick={handleClickMenu} />,
        default: () => <>
        <div class={s.wrapper}>
          <Tabs v-model:active={active.value} class={s.tabs} sticky offset-top={88}>
            <Tab title="上月">
              <ItemSummary></ItemSummary>
            </Tab>
            <Tab title="本月">
              <ItemSummary></ItemSummary>
            </Tab>
            <Tab title="今年">
              <ItemSummary></ItemSummary>
            </Tab>
            <Tab title="自定义时间">
              <ItemSummary></ItemSummary>
            </Tab>
          </Tabs>
        </div>
        <RouterLink to="/items/create">
          <FloatButton iconName="add" />
        </RouterLink>
        {overlayVisible.value && <Overlay onClose={handleClose} />}
        </>
      }}</MainLayout>
    )
  }
})