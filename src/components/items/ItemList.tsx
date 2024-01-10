import { defineComponent, onMounted, reactive, ref } from "vue";
import s from "./ItemList.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "vant";
import { MyOverlay } from "../../shared/MyOverlay";
import { ItemSummary } from "./ItemSummary";
import { RouterLink } from "vue-router";
import { FloatButton } from "../../shared/FloatButton";
import { DateSelectDialog } from "./DateSelectDialog";
import dayjs from "dayjs";
import { useMeStore } from "../../stores/useMeStore";
import { storeToRefs } from "pinia";

export const ItemList = defineComponent({
  setup: (props, context) => {
    // 获取用户信息
    const meStore = useMeStore();
    const { userInfo } = storeToRefs(meStore);
    const { getUserInfo } = meStore;
    if (!userInfo.value.email) {
      getUserInfo();
    }

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
    const active = ref(0);
    const handleClickTab = () => {
      if (active.value === 3) {
        dialogRef.value.openOverlay();
      }
    };

    // 时间：格式为 2023-09-03T16:50:04+08:00
    const thisMonth = reactive({
      startDate: dayjs().startOf("month").format(),
      endDate: dayjs().endOf("month").format(),
    });
    const lastMonth = reactive({
      startDate: dayjs().add(-1, "month").startOf("month").format(),
      endDate: dayjs().add(-1, "month").endOf("month").format(),
    });
    const thisYear = reactive({
      startDate: dayjs().startOf("year").format(),
      endDate: dayjs().endOf("year").format(),
    });
    const defineDate = reactive({
      startDate: "",
      endDate: "",
    });

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
                  onClickTab={handleClickTab}
                >
                  <Tab title="本月">
                    <ItemSummary
                      startDate={thisMonth.startDate}
                      endDate={thisMonth.endDate}
                    ></ItemSummary>
                  </Tab>
                  <Tab title="上个月">
                    <ItemSummary
                      startDate={lastMonth.startDate}
                      endDate={lastMonth.endDate}
                    ></ItemSummary>
                  </Tab>
                  <Tab title="今年">
                    <ItemSummary
                      startDate={thisYear.startDate}
                      endDate={thisYear.endDate}
                    ></ItemSummary>
                  </Tab>
                  <Tab title="自定义时间">
                    {defineDate.startDate && defineDate.endDate ? (
                      <ItemSummary
                        startDate={defineDate.startDate}
                        endDate={defineDate.endDate}
                      ></ItemSummary>
                    ) : (
                      <div class={s.text}>
                        <span>暂无数据，请选择时间段</span>
                      </div>
                    )}
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
                v-model:startDate={defineDate.startDate}
                v-model:endDate={defineDate.endDate}
              ></DateSelectDialog>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
