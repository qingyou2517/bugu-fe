import { defineComponent, reactive, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { showDialog, showToast, Tab, Tabs } from "vant";
import { MainLayout } from "../../layouts/MainLayout";
import { InputPad } from "./InputPad";
import { Tags } from "./Tags";
import { http } from "../../shared/Http";
import { AxiosError } from "axios";
import { useRouter } from "vue-router";
import { Icon } from "../../shared/Icon";

export const ItemCreate = defineComponent({
  setup: (props, context) => {
    const router = useRouter();
    // 收集记账tags、时间与金额
    type Data = {
      kind: string;
      tags_id: number[];
      amount: number;
      happen_at: string;
    };
    const data: Data = reactive({
      kind: "expenses",
      tags_id: [-1],
      amount: 0,
      happen_at: new Date().toISOString(),
    });

    // tab 切换
    const active = ref(0);
    const tagsRef1 = ref<typeof Tags>();
    const tagsRef2 = ref<typeof Tags>();

    // tab切换时，清空之前标签的选择标记、重置List的加载状态
    const changeTab = () => {
      if (active.value === 0) {
        data.kind = "expenses";
        tagsRef2.value?.reset();
      } else {
        data.kind = "income";
        tagsRef1.value?.reset();
      }
    };

    // 模拟处理后台报错
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        showDialog({
          title: "出错",
          message: Object.values(error.response.data.errors).join("\n"),
        });
      }
      throw error;
    };
    // 提交
    const handleSubmit = async () => {
      await http
        .post<Resource<Item>>("/items", data, {
          params: {
            _mock: "itemCreate",
          },
        })
        .then(() => {
          showToast({
            message: "记账成功",
            // position: "top",
            duration: 1200,
          });
          router.push("/items");
        })
        .catch(onError);
    };
    const goBack = () => {
      router.push("/items");
    };
    return () => (
      <MainLayout>
        {{
          title: () => "记一笔",
          icon: () => (
            <Icon name="left" class={s.navIcon} onClick={goBack}></Icon>
          ),
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs
                  v-model:active={active.value}
                  class="tabs"
                  sticky
                  offset-top={88}
                  onChange={changeTab}
                >
                  <Tab title="支出">
                    <Tags
                      kind="expenses"
                      ref={tagsRef1}
                      v-model:selectTagId={data.tags_id[0]}
                    ></Tags>
                  </Tab>
                  <Tab title="收入">
                    <Tags
                      kind="income"
                      ref={tagsRef2}
                      v-model:selectTagId={data.tags_id[0]}
                    ></Tags>
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad
                    v-model:amount={data.amount}
                    v-model:happenAt={data.happen_at}
                    onSubmit={() => handleSubmit()}
                  />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
