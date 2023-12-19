import { defineComponent, reactive, ref } from "vue";
import s from "./StatisticsPage.module.scss";
import { MainLayout } from "../layouts/MainLayout";
import { Tab, Tabs } from "vant";
import { Charts } from "../components/statistics/Charts";
import { DateSelectDialog } from "../components/items/DateSelectDialog";
import { MySelect } from "../shared/MySelect";
import { Icon } from "../shared/Icon";
import { useRouter } from "vue-router";

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
    const handleClickTab = (e: Tab) => {
      if (e.title === "自定义时间") {
        dialogRef.value.openOverlay();
      }
    };

    // 时间选择对话框：使用Overlay、Form来封装
    const show = ref(false);
    const dialogRef = ref();

    // 下拉选择
    const options = reactive([
      { value: "expense", text: "支出" },
      { value: "income", text: "收入" },
    ]);
    const category = ref("expense");

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
                >
                  <Tab title="本月">
                    <div class={s.select_wrapper}>
                      <MySelect options={options} v-model={category.value} />
                    </div>
                    <Charts />
                  </Tab>
                  <Tab title="上个月">
                    <div class={s.select_wrapper}>
                      <MySelect options={options} v-model={category.value} />
                    </div>
                    <Charts />
                  </Tab>
                  <Tab title="今年">
                    <div class={s.select_wrapper}>
                      <MySelect options={options} v-model={category.value} />
                    </div>
                    <Charts />
                  </Tab>
                  <Tab title="自定义时间">
                    <div class={s.select_wrapper}>
                      <MySelect options={options} v-model={category.value} />
                    </div>
                    <Charts />
                  </Tab>
                </Tabs>
                <DateSelectDialog
                  ref={dialogRef}
                  v-model:show={show.value}
                ></DateSelectDialog>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
