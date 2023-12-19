import { defineComponent } from "vue";
import s from "./TagCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { TagForm } from "./TagForm";
import { useRouter } from "vue-router";

export const TagCreate = defineComponent({
  setup: (props, context) => {
    const router = useRouter();
    const goBack = () => {
      router.push("/items/create");
    };

    return () => (
      <MainLayout>
        {{
          title: () => "新建标签",
          icon: () => <Icon name="left" class={s.navIcon} onClick={goBack} />,
          default: () => <TagForm></TagForm>,
        }}
      </MainLayout>
    );
  },
});
