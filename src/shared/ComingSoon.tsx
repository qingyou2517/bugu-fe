import { defineComponent, PropType } from "vue";
import s from "./ComingSoon.module.scss";
import { Icon } from "./Icon";
import { MainLayout } from "../layouts/MainLayout";
import { useRoute, useRouter } from "vue-router";

export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const router = useRouter();
    const routes = useRoute();

    type TitleMap = Record<string, string>;
    const titleMap: TitleMap = {
      "/export": "导出数据",
      "/classify": "自定义分类",
      "/notify": "记账提醒",
    };

    const goBack = () => {
      router.push("/items");
    };

    return () => (
      <MainLayout>
        {{
          title: () => `${titleMap[routes.fullPath]}`,
          icon: () => <Icon name="home" class={s.navIcon} onClick={goBack} />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.pig_wrapper}>
                <Icon name="pig" class={s.pig} />
              </div>
              <p class={s.text}>开发中，敬请期待</p>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});

export default ComingSoon;
