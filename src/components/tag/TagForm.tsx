import {
  PropType,
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
} from "vue";
import s from "./TagForm.module.scss";
import { Form, Field, FormInstance, showToast } from "vant";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { MyButton } from "../../shared/MyButton";
import { useRoute, useRouter } from "vue-router";
import { http } from "../../shared/Http";

export const TagForm = defineComponent({
  props: {
    updateId: {
      type: Number as PropType<number>, // 区分：新增/修改
    },
  },
  setup: (props, context) => {
    const router = useRouter();
    const route = useRoute();

    // form 表单
    const formRef = ref<FormInstance>();
    const formData = reactive({
      id: -1,
      name: "",
      sign: "",
      kind: route.query.kind!.toString(),
    });
    const nameRules = [
      { required: true, message: "请填写标签名" },
      { pattern: /^.{1,4}$/, message: "只能填1~4个字符" },
    ];

    // 回显待编辑标签
    onMounted(async () => {
      if (!props.updateId) {
        return;
      }
      const res = await http.get<Resource<Tag>>(`/tags/${props.updateId}`, {
        _mock: "tagShow",
      });
      Object.assign(formData, res.data.resource);
    });

    // 表单校验与提交
    const hasError = ref(false);
    const handleSubmit = async () => {
      try {
        await formRef.value?.validate("name");
        if (!formData.sign) {
          hasError.value = true; // 符号列表的校验
          return;
        }
        if (props.updateId) {
          await http
            .patch(`/tags/${formData.id}`, formData, {
              params: { _mock: "tagEdit" },
            })
            .then(() => {
              showToast({
                message: "已保存修改",
                duration: 1200,
              });
            })
            .catch((err) => {
              throw err;
            });
        } else {
          await http
            .post("/tags", formData, {
              params: {
                _mock: "tagCreate",
              },
            })
            .then(() => {
              showToast({
                message: "新增成功",
                duration: 1200,
              });
            })
            .catch((err) => {
              throw err;
            });
        }
        router.back();
      } catch (err) {
        // console.log("表单校验失败: ", err);
      }
    };

    return () => (
      <Form ref={formRef}>
        <label class={s.label_wrapper}>
          <span class={s.title}>标签名</span>
          <Field
            label=""
            label-width="48"
            label-align="left"
            name="name"
            clearable
            class="input_wrapper"
            placeholder="2~4个字符"
            v-model={formData.name}
            rules={nameRules}
            format-trigger="onBlur"
          ></Field>
        </label>
        <Field label="" label-width="32" label-align="left">
          {{
            input: () => (
              <div class={s.sign_wrapper}>
                <div>
                  <span class={s.title}>从以下分类中选择一个符号</span>
                  <span>{formData.sign}</span>
                </div>
                <EmojiSelect v-model={formData.sign} />
              </div>
            ),
          }}
        </Field>
        <span class={s.signError}>
          {hasError.value ? "必须选择一个符号" : ""}
        </span>
        <p class={s.tips}>记账时长按标签即可进行编辑</p>

        <MyButton onClick={handleSubmit}>
          {props.updateId ? "保存" : "确定"}
        </MyButton>
      </Form>
    );
  },
});
