import { defineComponent, onMounted, PropType, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs, Tag } from "vant";
import { useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { InputPad } from "./InputPad";
import { http } from "../../shared/Http";

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const router = useRouter();
    // tab 切换
    const active = ref(0);
    interface Tag {
      id: number;
      name: string;
      sign: string;
      kind: string;
    }
    const refExpensesTags = ref<Tag[]>([]);
    const refIncomeTags = ref<Tag[]>([]);
    onMounted(async () => {
      const expenseRes = await http.get<{ resources: Tag[] }>("/tags", {
        kind: "expense",
        _mock: "tagIndex",
      });
      const incomeRes = await http.get<{ resources: Tag[] }>("/tags", {
        kind: "income",
        _mock: "tagIndex",
      });
      refExpensesTags.value = expenseRes.data.resources;
      refIncomeTags.value = incomeRes.data.resources;
    });
    // 选择标签
    const selectTagId = ref(-1);
    const isClickAdd = ref(false);
    const selectTag = (tag: Tag) => {
      selectTagId.value = tag.id;
    };
    const ClickAdd = () => {
      selectTagId.value = -1;
      // router.push("/tags/create")
    };
    // tab切换时，清空之前标签的选择标记
    const changeTab = () => {
      selectTagId.value = -1;
    };
    const goBack = () => {
      // router.push("/items")
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
                  class={s.tabs}
                  sticky
                  offset-top={88}
                  onChange={changeTab}
                >
                  <Tab title="支出" class={s.tags_wrapper}>
                    <div class={s.tag} onClick={() => ClickAdd}>
                      <div class={s.sign}>
                        <Icon name="addTag" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {refExpensesTags.value.map((tag) => (
                      <div
                        class={[
                          s.tag,
                          selectTagId.value === tag.id ? s.selected : "",
                        ]}
                        onClick={() => selectTag(tag)}
                      >
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                  </Tab>
                  <Tab title="收入" class={s.tags_wrapper}>
                    <div class={s.tag} onClick={() => ClickAdd}>
                      <div class={s.sign}>
                        <Icon name="addTag" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {refIncomeTags.value.map((tag) => (
                      <div
                        class={[
                          s.tag,
                          selectTagId.value === tag.id ? s.selected : "",
                        ]}
                        onClick={() => selectTag(tag)}
                      >
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
