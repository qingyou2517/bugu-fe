import { defineComponent, reactive, ref } from "vue";
import s from "./StatisticsPage.module.scss";
import { MainLayout } from "../layouts/MainLayout";
import { Tab, Tabs } from "vant";
import { Charts } from "../components/statistics/Charts";
import { DateSelectDialog } from "../components/items/DateSelectDialog";
import { MySelect } from "../shared/MySelect";
import { Icon } from "../shared/Icon";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

export const StatisticsPage = defineComponent({
  setup: (props, context) => {
    const router = useRouter();
    // tab切换
    interface Tab {
      name: string | number;
      title: string;
      event: MouseEvent;
      disabled: boolean;
    }
    const active = ref(0);
    const titleList = ref(["本月", "上个月", "今年", "自定义时间"]);
    const handleClickTab = (e: Tab) => {
      if (e.title === "自定义时间") {
        dialogRef.value.openOverlay();
      }
    };

    // 时间：格式为 2023-09-03
    const thisMonth = reactive({
      startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
      endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
    });
    const lastMonth = reactive({
      startDate: dayjs().add(-1, "month").startOf("month").format("YYYY-MM-DD"),
      endDate: dayjs().add(-1, "month").endOf("month").format("YYYY-MM-DD"),
    });
    const thisYear = reactive({
      startDate: dayjs().startOf("year").format("YYYY-MM-DD"),
      endDate: dayjs().endOf("year").format("YYYY-MM-DD"),
    });
    const defineDate = reactive({
      startDate: "",
      endDate: "",
    });

    // 时间选择对话框：使用Overlay、Form来封装
    const show = ref(false);
    const dialogRef = ref();

    const goBack = () => {
      router.push("/items");
    };

    return () => (
      <MainLayout>
        {{
          title: () => "统计",
          icon: () => <Icon name="home" class={s.navIcon} onClick={goBack} />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs
                  v-model:active={active.value}
                  class={s.tabs}
                  sticky
                  offset-top={88}
                  onClickTab={(e: Tab) => handleClickTab(e)}
                  key={active.value}
                >
                  <Tab title="本月">
                    <Charts
                      startDate={thisMonth.startDate}
                      endDate={thisMonth.endDate}
                    />
                  </Tab>
                  <Tab title="上个月">
                    <Charts
                      startDate={lastMonth.startDate}
                      endDate={lastMonth.endDate}
                    />
                  </Tab>
                  <Tab title="今年">
                    <Charts
                      startDate={thisYear.startDate}
                      endDate={thisYear.endDate}
                    />
                  </Tab>
                  <Tab title="自定义时间">
                    {defineDate.startDate && defineDate.endDate ? (
                      <Charts
                        startDate={defineDate.startDate}
                        endDate={defineDate.endDate}
                      />
                    ) : (
                      <div class={s.text}>
                        <span>请点击导航栏，选择时间段</span>
                      </div>
                    )}
                  </Tab>
                </Tabs>
                <DateSelectDialog
                  ref={dialogRef}
                  v-model:show={show.value}
                  v-model:startDate={defineDate.startDate}
                  v-model:endDate={defineDate.endDate}
                ></DateSelectDialog>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
