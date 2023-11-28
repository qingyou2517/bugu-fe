import { defineComponent } from 'vue';
import s from './TagEdit.module.scss';
import { Icon } from '../../shared/Icon';
import { MainLayout } from '../../layouts/MainLayout';
import { TagForm } from './TagForm';
import { MyButton } from '../../shared/MyButton';

export const TagEdit = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>{{
        title: () => '编辑标签',
        icon: () => <Icon name="left" class={s.navIcon} onClick={() => { }} />,
        default: () => <>
          <TagForm></TagForm>
          <div class="danger">
            <MyButton kind='danger'>删除</MyButton>
          </div>
        </>
      }}</MainLayout >
    )
  }
})