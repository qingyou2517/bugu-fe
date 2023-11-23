import { defineComponent, PropType } from 'vue';
import s from './Overlay.module.scss';
import { RouterLink } from 'vue-router';
import { Icon } from '../shared/Icon';

export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<(e: TouchEvent) => void>
    }
  },
  setup: (props, context) => {
    return () => (
      <>
        <div class={s.mask} onClick={props.onClose}></div>
        <div class={s.overlay}>
          <section class={s.currentUser}>
            <h2>未登录</h2>
            <p>点击这里登录</p>
          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to="/statistics" class={s.action}>
                  <Icon name="statistics" class={s.asideIcon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={s.action}>
                  <Icon name="export" class={s.asideIcon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/classify" class={s.action}>
                  <Icon name="classify" class={s.asideIcon} />
                  <span>自定义分类</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notify" class={s.action}>
                  <Icon name="notify" class={s.asideIcon} />
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    )
  }
})