import { defineComponent, PropType, ref } from 'vue';
import s from './ItemSummary.module.scss';
import { Cell, List, PullRefresh } from 'vant';

export const ItemSummary = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    // List组件的触底加载
    const list = ref([1]);
    const loading = ref(false);
    const finished = ref(false);
    const onLoad = () => {  // 触底加载
      // 异步更新数据
      setTimeout(() => {
        if (refreshing.value) {
          list.value = [];
          refreshing.value = false;
        }

        for (let i = 0; i < 10; i++) {
          list.value.push(i);
        }
        // 加载状态结束
        loading.value = false;

        // 若所有数据全部加载完成
        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    }

    // 下拉刷新
    const refreshing = ref(false);
    const onRefresh = () => {
      // 清空列表数据
      finished.value = false;

      // 重新加载数据
      refreshing.value = true;
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      onLoad();   // 自动触发一次触底加载
    };
    
    return () => <>
      <PullRefresh v-model={refreshing.value} success-text="刷新成功" onRefresh={() => onRefresh}>
        <ul class={s.total}>
          <li><span>收入</span><span>128</span></li>
          <li><span>支出</span><span>99</span></li>
          <li><span>净收入</span><span>39</span></li>
        </ul>
        <List v-model:loading={loading.value}
          finished={finished.value}
          finished-text="没有更多了"
          onLoad={() => onLoad}
          class={s.list}
        >
          <Cell >
            <div class={s.item}>
              <div class={s.sign}>
                <span>X</span>
              </div>
              <div class={s.text}>
                <div class={s.tagAndAmount}>
                  <span class={s.tag}>旅行</span>
                  <span class={s.amount}>￥1234</span>
                </div>
                <div class={s.time}>
                  2023-01-01 12:39
                </div>
              </div>
            </div>
          </Cell>
          <Cell>
            <div class={s.item}>
              <div class={s.sign}>
                <span>X</span>
              </div>
              <div class={s.text}>
                <div class={s.tagAndAmount}>
                  <span class={s.tag}>旅行</span>
                  <span class={s.amount}>￥1234</span>
                </div>
                <div class={s.time}>
                  2023-01-01 12:39
                </div>
              </div>
            </div>
          </Cell>
          <Cell>
            <div class={s.item}>
              <div class={s.sign}>
                <span>X</span>
              </div>
              <div class={s.text}>
                <div class={s.tagAndAmount}>
                  <span class={s.tag}>旅行</span>
                  <span class={s.amount}>￥1234</span>
                </div>
                <div class={s.time}>
                  2023-01-01 12:39
                </div>
              </div>
            </div>
          </Cell>
          <Cell>
            <div class={s.item}>
              <div class={s.sign}>
                <span>X</span>
              </div>
              <div class={s.text}>
                <div class={s.tagAndAmount}>
                  <span class={s.tag}>旅行</span>
                  <span class={s.amount}>￥1234</span>
                </div>
                <div class={s.time}>
                  2023-01-01 12:39
                </div>
              </div>
            </div>
          </Cell>
          <Cell>
            <div class={s.item}>
              <div class={s.sign}>
                <span>X</span>
              </div>
              <div class={s.text}>
                <div class={s.tagAndAmount}>
                  <span class={s.tag}>旅行</span>
                  <span class={s.amount}>￥1234</span>
                </div>
                <div class={s.time}>
                  2023-01-01 12:39
                </div>
              </div>
            </div>
          </Cell>
          <Cell>
            <div class={s.item}>
              <div class={s.sign}>
                <span>X</span>
              </div>
              <div class={s.text}>
                <div class={s.tagAndAmount}>
                  <span class={s.tag}>旅行</span>
                  <span class={s.amount}>￥1234</span>
                </div>
                <div class={s.time}>
                  2023-01-01 12:39
                </div>
              </div>
            </div>
          </Cell>
          <Cell>
            <div class={s.item}>
              <div class={s.sign}>
                <span>X</span>
              </div>
              <div class={s.text}>
                <div class={s.tagAndAmount}>
                  <span class={s.tag}>旅行</span>
                  <span class={s.amount}>￥1234</span>
                </div>
                <div class={s.time}>
                  2023-01-01 12:39
                </div>
              </div>
            </div>
          </Cell>
          <Cell>
            <div class={s.item}>
              <div class={s.sign}>
                <span>X</span>
              </div>
              <div class={s.text}>
                <div class={s.tagAndAmount}>
                  <span class={s.tag}>旅行</span>
                  <span class={s.amount}>￥1234</span>
                </div>
                <div class={s.time}>
                  2023-01-01 12:39
                </div>
              </div>
            </div>
          </Cell>
          <Cell>
            <div class={s.item}>
              <div class={s.sign}>
                <span>X</span>
              </div>
              <div class={s.text}>
                <div class={s.tagAndAmount}>
                  <span class={s.tag}>旅行</span>
                  <span class={s.amount}>￥1234</span>
                </div>
                <div class={s.time}>
                  2023-01-01 12:39
                </div>
              </div>
            </div>
          </Cell>
        </List>
      </PullRefresh>
    </>
  }
})