import { computed, defineComponent, reactive, ref } from "vue";
import s from "./SignInPage.module.scss";
import { MainLayout } from "../layouts/MainLayout";
import { Icon } from "../shared/Icon";
import { Field, Form } from "vant";
import type { FormInstance } from "vant";
import { MyButton } from "../shared/MyButton";
import { http } from "../shared/Http";
import { useRouter, useRoute } from "vue-router";

export const SignInPage = defineComponent({
  setup: (props, context) => {
    const router = useRouter();
    const route = useRoute();
    const formRef = ref<FormInstance>();
    const formData = reactive({
      email: "2517789608@qq.com",
      code: "102641",
    });
    const emailRules = [
      { required: true, message: "请填写邮箱地址" },
      { pattern: /.+@.+/, message: "邮箱地址格式不正确" },
    ];
    const loginDisabled = computed(() => {
      return formData.email === "" || formData.code.length !== 6;
    });
    const cd = ref(3); // 发送验证码的冷却倒计时
    const hasClickSend = ref(false); // 已点击发送验证码
    const codeDisabled = computed(() => {
      if (cd.value >= 0 && hasClickSend.value) {
        return true;
      }
    });
    const sendCode = async () => {
      await formRef.value?.validate("email").catch((err) => {
        throw err;
      });
      hasClickSend.value = true; // 放在 axios 请求前
      const res = await http
        .post(
          "/validation_codes",
          {
            email: formData.email,
          },
          {
            params: {
              _autoLoading: true,
            },
          }
        )
        .catch((err) => {
          // console.err(err);
          // throw err; // 阻塞下面的代码执行
        })
        .finally(() => {
          let id = setInterval(() => {
            cd.value--;
            if (cd.value <= 0) {
              clearInterval(id);
              hasClickSend.value = false;
              cd.value = 3;
            }
          }, 1000);
        });
    };
    const codeError = ref(false); // 验证码报错
    const handleLogin = async () => {
      const res = await http
        .post<{ jwt: string }>("/session", formData)
        .catch((err) => {
          codeError.value = true;
          throw err;
        });
      if (res.data.jwt) {
        localStorage.setItem("jwt", res.data.jwt);
        const return_to = route.query.return_to?.toString(); // 返回登录前的页面
        router.push(return_to || "/");
      }
    };
    const goBack = () => {
      const { return_to } = route.query;
      if (return_to) {
        router.push(return_to.toString());
      }
    };
    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <Icon name="user" class={s.navIcon} onClick={goBack} />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon name="bugu" class={s.icon} />
                <h1 class={s.appName}>青游记账</h1>
              </div>
              <Form ref={formRef}>
                <label class={s.label_wrapper}>
                  <span class={s.title}>邮箱地址</span>
                  <Field
                    label=""
                    label-width="48"
                    label-align="left"
                    name="email"
                    clearable
                    class="input_wrapper"
                    placeholder="请输入邮箱地址，然后点击发送验证码"
                    v-model={formData.email}
                    rules={emailRules}
                    format-trigger="onBlur"
                  ></Field>
                </label>
                <label class={s.label_wrapper}>
                  <span class={s.title}>验证码</span>
                  <div class={s.code_wrapper}>
                    <Field
                      label=""
                      label-width="48"
                      label-align="left"
                      clearable
                      class="input_wrapper"
                      placeholder="6位数字"
                      v-model={formData.code}
                    ></Field>
                    <span class="codeButton">
                      <MyButton
                        disabled={codeDisabled.value}
                        onClick={() => sendCode()}
                      >
                        {cd.value >= 0 && !codeDisabled.value
                          ? "发送验证码"
                          : cd.value + " 秒后可再次点击"}
                      </MyButton>
                    </span>
                  </div>
                  <span class={s.codeError}>
                    {codeError.value ? "验证码错误" : ""}
                  </span>
                </label>
                <MyButton
                  class={s.loginButton}
                  disabled={loginDisabled.value}
                  onClick={() => handleLogin()}
                >
                  登录
                </MyButton>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
