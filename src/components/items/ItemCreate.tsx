import { defineComponent, onMounted, PropType, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs, List } from "vant";
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
    const refExpensesTags = ref<Tag[]>([]);
    const refIncomeTags = ref<Tag[]>([]);

    // List
    const loading = ref(false);
    const finished = ref(false);
    const expensePage = ref(1);
    const incomePage = ref(1);
    const expenseCount = ref(0);
    const incomeCount = ref(0);
    const getTagsList = async (kind: string, page: number) => {
      const res = await http.get<Resources<Tag>>("/tags", {
        kind,
        page,
        _mock: "tagIndex",
      });
      const { resources, pager } = res.data;
      if (kind === "expense") {
        expenseCount.value = pager.count;
        refExpensesTags.value.push(...resources);
      } else if (kind === "income") {
        incomeCount.value = pager.count;
        refIncomeTags.value.push(...resources);
      }
      loading.value = false;
    };
    getTagsList("expense", 1);
    getTagsList("income", 1);
    const handleLoadList = (kind: string) => {
      if (kind === "expense") {
        expensePage.value++;
        if (refExpensesTags.value.length < expenseCount.value) {
          getTagsList(kind, expensePage.value);
        } else {
          finished.value = true;
        }
      } else {
        incomePage.value++;
        if (refIncomeTags.value.length < incomeCount.value) {
          console.log(11);
          getTagsList(kind, incomePage.value);
        } else {
          finished.value = true;
        }
      }
    };

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
    // tab切换时，清空之前标签的选择标记、重置List的加载状态
    const changeTab = () => {
      selectTagId.value = -1;
      loading.value = false;
      finished.value = false;
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
                  <Tab title="支出">
                    <List
                      class={s.tags_wrapper}
                      v-model:loading={loading.value}
                      finished={finished.value}
                      finished-text=""
                      immediate-check={false}
                      onLoad={() => handleLoadList("expense")}
                    >
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
                    </List>
                  </Tab>
                  <Tab title="收入">
                    <List
                      class={s.tags_wrapper}
                      v-model:loading={loading.value}
                      finished={finished.value}
                      finished-text=""
                      immediate-check={false}
                      onLoad={() => handleLoadList("income")}
                    >
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
                    </List>
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
