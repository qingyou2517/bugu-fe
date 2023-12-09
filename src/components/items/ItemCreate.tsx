import { defineComponent, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "vant";
import { MainLayout } from "../../layouts/MainLayout";
import { InputPad } from "./InputPad";
import { Tags } from "./Tags";

export const ItemCreate = defineComponent({
  setup: (props, context) => {
    // tab 切换
    const active = ref(0);
    const tagsRef1 = ref<typeof Tags>();
    const tagsRef2 = ref<typeof Tags>();

    // tab切换时，清空之前标签的选择标记、重置List的加载状态
    const changeTab = () => {
      if (active.value === 0) {
        tagsRef2.value?.reset();
      } else {
        tagsRef1.value?.reset();
      }
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
                  class="tabs"
                  sticky
                  offset-top={88}
                  onChange={changeTab}
                >
                  <Tab title="支出">
                    <Tags kind="expense" ref={tagsRef1}></Tags>
                  </Tab>
                  <Tab title="收入">
                    <Tags kind="income" ref={tagsRef2}></Tags>
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
