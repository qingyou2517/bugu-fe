import { defineComponent, PropType, ref } from 'vue';
import s from './StatisticsPage.module.scss';
import { MainLayout } from '../layouts/MainLayout';
import { Icon } from '../shared/Icon';
import { Tab, Tabs } from 'vant';
import { Charts } from '../components/statistics/Charts';
import { DateSelectDialog } from '../components/items/DateSelectDialog';

export const StatisticsPage = defineComponent({
  setup: (props, context) => {
    // tab切换
    interface Tab {
      name: string | number;
      title: string;
      event: MouseEvent;
      disabled: boolean;
    }
    const active = ref(0);
    const handleClickTab = (e: Tab) => {
      if (e.title === "自定义时间") {
        dialogRef.value.openOverlay();
      }
    };

    // 时间选择对话框：使用Overlay、Form来封装
    const show = ref(false);
    const dialogRef = ref();
    
    return () => (
      <MainLayout>{{
        title: () => "统计",
        icon: () => <Icon name="left" class={s.navIcon}></Icon>,
        default: () => <>
          <div class={s.wrapper}>
            <Tabs
              v-model:active={active.value}
              class={s.tabs}
              sticky
              offset-top={88}
              onClickTab={(e: Tab) => handleClickTab(e)}
            >
              <Tab title="本月">
                <Charts/>
              </Tab>
              <Tab title="上个月">
                <Charts />
              </Tab>
              <Tab title="今年">
                <Charts />
              </Tab>
              <Tab title="自定义时间">
                <Charts />
              </Tab>
            </Tabs>
            <DateSelectDialog
                ref={dialogRef}
                v-model:show={show.value}
              ></DateSelectDialog>
          </div>
        </>
      }}</MainLayout>
    )
  }
})