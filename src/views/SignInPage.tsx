import { computed, defineComponent, reactive, ref } from "vue";
import s from "./SignInPage.module.scss";
import { MainLayout } from "../layouts/MainLayout";
import { Icon } from "../shared/Icon";
import { Field, Form } from "vant";
import { MyButton } from "../shared/MyButton";
import { throttle } from "../shared/throttle";

export const SignInPage = defineComponent({
  setup: (props, context) => {
    const formRef = ref(null);
    const formData = reactive({
      email: "",
      code: "",
    });
    const emailRules = [
      { required: true, message: "请填写邮箱地址" },
      { pattern: /.+@.+/, message: "必须是邮件地址" }
    ];
    const loginDisabled = computed(() => {
      return formData.email === "" || formData.code === "";
    });
    const cd = ref(2)   // 发送验证码的冷却倒计时
    const hasClickSend = ref(false) // 已点击发送验证码
    const codeDisabled = computed(() => {
      if (cd.value >= 0 && hasClickSend.value) {
        return true
      }
    })
    const sendCode = () => {
      hasClickSend.value = true
      let id = setInterval(() => {
        cd.value--
        if (cd.value <= 0) {
          clearInterval(id)
          hasClickSend.value = false
          cd.value = 2
        }
      }, 1000)
    }
    const handleLogin = () => {
      console.log("login")
    }
    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <Icon name="left" class={s.navIcon}></Icon>,
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
                      <MyButton disabled={codeDisabled.value} onClick={() => sendCode()}>
                        {(cd.value >= 0 && !codeDisabled.value) ? "发送验证码" : cd.value + " 秒后可再次点击"}
                      </MyButton>
                    </span>
                  </div>
                </label>
                <MyButton class={s.loginButton} disabled={loginDisabled.value} onClick={() => handleLogin()}>
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
