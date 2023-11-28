import { defineComponent } from 'vue';
import s from './TagCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { TagForm } from './TagForm';

export const TagCreate = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <Icon name="left" class={s.navIcon} onClick={() => { }} />,
        default: () => (
          <TagForm></TagForm>
        )
      }}</MainLayout >
    )
  }
})