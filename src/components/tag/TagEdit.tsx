import { defineComponent } from "vue";
import s from "./TagEdit.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { TagForm } from "./TagForm";
import { MyButton } from "../../shared/MyButton";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "../../shared/Icon";
import { http } from "../../shared/Http";
import { showConfirmDialog, showToast } from "vant";

export const TagEdit = defineComponent({
  setup: (props, context) => {
    const router = useRouter();
    const route = useRoute();
    const numberId = parseInt(route.params.id!.toString());
    const goBack = () => {
      router.push("/items/create");
    };
    const handleDelete = async () => {
      try {
        await showConfirmDialog({
          title: "请确认",
          message: "是否删除标签及记账？",
        });
        await http.delete(`/tags/${numberId}`, {
          _mock: "tagDelete",
        });
        showToast({
          message: "已删除标签与记账",
          duration: 1200,
        });
        router.back();
      } catch (err) {}
    };

    return () => (
      <MainLayout>
        {{
          title: () => "编辑标签",
          icon: () => <Icon name="left" class={s.navIcon} onClick={goBack} />,
          default: () => (
            <>
              <TagForm updateId={numberId}></TagForm>
              <div class="danger">
                <MyButton kind="danger" onClick={() => handleDelete()}>
                  删除标签与记账
                </MyButton>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
