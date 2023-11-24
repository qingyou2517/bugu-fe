import { defineComponent, PropType, ref } from 'vue';
import s from './ItemCreate.module.scss';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from 'vant';
import { MainLayout } from '../../layouts/MainLayout';
import { InputPad } from './InputPad';

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    // tab 切换
    const active = ref(0)
    const goBack = () => {

    }
    return () => (
      <MainLayout>{
        {
          title: () => "记一笔",
          icon: () => <Icon name="left" class={s.navIcon} onClick={goBack}></Icon>,
          default: () => <>
            <Tabs v-model:active={active.value}>
              <Tab title="支出">支出项</Tab>
              <Tab title="收入">收入项</Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad />
            </div>
          </>
        }
      }</MainLayout>
    )
  }
})