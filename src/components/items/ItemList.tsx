import { defineComponent, onMounted, ref } from "vue";
import s from "./ItemList.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "vant";
import { MyOverlay } from "../../shared/MyOverlay";
import { ItemSummary } from "./ItemSummary";
import { RouterLink } from "vue-router";
import { FloatButton } from "../../shared/FloatButton";
import { DateSelectDialog } from "./DateSelectDialog";

export const ItemList = defineComponent({
  setup: (props, context) => {
    // 侧边导航栏与遮罩层
    const overlayVisible = ref(false);
    const handleClickMenu = () => {
      overlayVisible.value = !overlayVisible.value;
    };
    const handleClose = () => {
      overlayVisible.value = false;
    };

    // 时间选择对话框：使用Overlay、Form来封装
    const show = ref(false);
    const dialogRef = ref();

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

    return () => (
      <MainLayout>
        {{
          title: () => "青游记账",
          icon: () => (
            <Icon name="menu" class={s.navIcon} onClick={handleClickMenu} />
          ),
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs
                  v-model:active={active.value}
                  class={s.tabs}
                  sticky
                  offset-top={88}
                  onClickTab={(e: Tab) => handleClickTab(e)}
                >
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
              {overlayVisible.value && <MyOverlay onClose={handleClose} />}
              <DateSelectDialog
                ref={dialogRef}
                v-model:show={show.value}
              ></DateSelectDialog>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
