import { computed, defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import s from './TagCreate.module.scss';
import { Form, Field, Button } from 'vant';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { MyButton } from '../../shared/MyButton';

export const TagCreate = defineComponent({
  // props: {
  //   name: {
  //     type: String as PropType<string>
  //   }
  // },
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
      return formData.name === '' && formData.sign === ''
    })
    const handleSubmit = () => {
      console.log("submit")
    }
    // 动态获取 emojiList 的宽度 => 用于计算nav导航栏的宽度、设置横向滚动
    const navWidth = ref(0)
    onMounted(() => {
      const el = document.getElementById("emojiList") as Element
      navWidth.value = Number(getComputedStyle(el).width.split('px')[0]) - 12
    })
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <Icon name="left" class={s.navIcon} onClick={() => { }} />,
        default: () => (
          <Form ref={formRef}>
            <Field label="标签名" label-width="48" label-align="left" clearable
              class={s.formRow}
              placeholder="请输入标签名"
              v-model={formData.name}
              rules={nameRules}
              format-trigger="onBlur"
            ></Field>
            <Field label="" label-width="32" label-align="left">{{
              input: () =>
                <div class={s.sign_wrapper}>
                  <div>
                    <span class={s.title}>符号</span>
                    <span class={s.formItem_name}>{formData.sign}</span>
                  </div>
                  <div class={s.emojiList} id='emojiList'>
                    <nav style={{ width: navWidth.value + 'px' }}>
                      <span class={s.selected}>表情</span>
                      <span>手势</span>
                      <span>职业</span>
                      <span>衣服</span>
                      <span>动物</span>
                      <span>自然</span>
                      <span>食物</span>
                      <span>运动</span>
                      <span>表情</span>
                      <span>手势</span>
                      <span>职业</span>
                      <span>衣服</span>
                      <span>动物</span>
                      <span>自然</span>
                      <span>食物</span>
                      <span>运动</span>
                    </nav>
                    <ol>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                      <li>😀</li>
                    </ol>
                  </div>
                  {/* <EmojiSelect v-model={formData.sign} class={[s.emojiList, s.error]} /> */}
                </div>
            }}</Field>
            <p class={s.tips}>记账时长按标签即可进行编辑</p>
            <MyButton onClick={handleSubmit} disabled={disabled.value}>确定</MyButton>
          </Form>
        )
      }
      }</MainLayout >
    )
  }
})