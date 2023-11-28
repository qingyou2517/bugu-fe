import { computed, defineComponent, reactive, ref } from 'vue';
import s from './TagForm.module.scss';
import { Form, Field } from 'vant';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { MyButton } from '../../shared/MyButton';

export const TagForm = defineComponent({
  setup: (props, context) => {
    // form 表单
    const formRef = ref(null)
    const formData = reactive({
      name: '',
      sign: '',
    })
    const nameRules = [
      { required: true, message: '请填写标签名' },
      { pattern: /^.{1,4}$/, message: '只能填1~4个字符' }
    ]
    const disabled = computed(() => {
      return formData.name === '' || formData.sign === ''
    })
    const handleSubmit = () => {
      console.log("submit")
    }

    // 区分：新增/修改
    const updateId = ref(0) // 默认为0，进入修改页面则改为1
    return () => (
      <Form ref={formRef}>
        <label class={s.label_wrapper}>
          <span class={s.title}>标签名</span>
          <Field label="" label-width="48" label-align="left" clearable
            class="input_wrapper"
            placeholder="2~4个字符"
            v-model={formData.name}
            rules={nameRules}
            format-trigger="onBlur"
          ></Field>
        </label>
        <Field label="" label-width="32" label-align="left">{{
          input: () =>
            <div class={s.sign_wrapper}>
              <div>
                <span class={s.title}>符号</span>
                <span>{formData.sign}</span>
              </div>
              <EmojiSelect v-model={formData.sign} />
            </div>
        }}</Field>
        <p class={s.tips}>记账时长按标签即可进行编辑</p>

        <MyButton onClick={handleSubmit} disabled={disabled.value}>{updateId.value ? '保存' : '确定'}</MyButton>
      </Form>
    )
  }
})