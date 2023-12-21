import {
  defineComponent,
  onBeforeUnmount,
  PropType,
  reactive,
  ref,
  watch,
} from "vue";
import s from "./ItemSummary.module.scss";
import { Cell, List, PullRefresh } from "vant";
import { http } from "../../shared/Http";
import { amountFormat, dateFormat } from "../../shared/format";

export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true,
    },
    endDate: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup: (props, context) => {
    // 获取收支总结：所需时间格式如 2023-09-03
    const balanceData = reactive<Balance>({
      income: 0,
      expenses: 0,
      balance: 0,
    });
    const getBalanceData = async () => {
      const res = await http.get<Balance>("/items/balance", {
        happen_after: props.startDate.split("T")[0],
        happen_before: props.endDate.split("T")[0],
        _mock: "itemIndexBalance",
      });
      Object.assign(balanceData, res.data);
    };
    getBalanceData();

    // List组件的触底加载
    const itemsList = ref<Item[]>([]);
    const loading = ref(false);
    const finished = ref(false);
    const page = ref(1);

    // 获取详细账目数据：所需时间格式如 2023-09-03T16:50:04+08:00
    const getItemsList = async () => {
      const res = await http.get<Resources<Item>>("/items", {
        happen_after: props.startDate,
        happen_before: props.endDate,
        page: page.value,
        _mock: "itemIndex",
      });
      const { resources, pager } = res.data;
      if (itemsList.value.length < pager.count) {
        itemsList.value.push(...resources);
      }
      // push 之后，是否还有剩余数据
      if (itemsList.value.length >= pager.count) {
        finished.value = true;
      }
      loading.value = false;
    };
    getItemsList();

    // 触底加载
    let timer = ref<number>(0);
    const handleLoadList = () => {
      if (!finished.value) {
        // 发请求
        timer.value = window.setTimeout(() => {
          page.value++;
          getItemsList();
        }, 100);
      }
    };
    onBeforeUnmount(() => {
      clearTimeout(timer.value);
    });

    // 下拉刷新
    const refreshing = ref(false);
    const handleRefresh = () => {
      // 清空列表数据、收支数据
      if (refreshing.value) {
        itemsList.value = [];
        refreshing.value = false;
        finished.value = false;
        Object.assign(balanceData, {
          income: 0,
          expenses: 0,
          balance: 0,
        });
      }

      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      page.value = 0;
      handleLoadList(); // 自动触发一次触底加载
      getBalanceData();
    };

    // 自定义时间
    watch(
      () => [props.startDate, props.endDate],
      () => {
        itemsList.value = [];
        finished.value = false;
        page.value = 1;
        getItemsList();
      }
    );
    watch(
      () => [props.startDate, props.endDate],
      () => {
        Object.assign(balanceData, {
          income: 0,
          expenses: 0,
          balance: 0,
        });
        getBalanceData();
      }
    );

    return () => (
      <>
        <PullRefresh
          v-model={refreshing.value}
          success-text="刷新成功"
          onRefresh={() => handleRefresh()}
        >
          <ul class={s.total}>
            <li>
              <span>收入</span>
              <span>{amountFormat(balanceData.income)}</span>
            </li>
            <li>
              <span>支出</span>
              <span>{amountFormat(balanceData.expenses)}</span>
            </li>
            <li>
              <span>净收入</span>
              <span>{amountFormat(balanceData.balance)}</span>
            </li>
          </ul>
          <List
            immediate-check={false}
            v-model:loading={loading.value}
            finished={finished.value}
            finished-text="没有更多了"
            onLoad={() => handleLoadList()}
            class={s.list}
          >
            {itemsList.value.map((item) => (
              <Cell>
                <div class={s.item}>
                  <div class={s.sign}>
                    <span>{item.tags_id[0]}</span>
                  </div>
                  <div class={s.text}>
                    <div class={s.tagAndAmount}>
                      <span class={s.tag}>{item.tags[0].name}</span>
                      <span class={s.amount}>
                        {item.kind === "expenses" ? "- " : "+ "}
                        {amountFormat(item.amount)}￥
                      </span>
                    </div>
                    <div class={s.time}>{dateFormat(item.happen_at)}</div>
                  </div>
                </div>
              </Cell>
            ))}
          </List>
        </PullRefresh>
      </>
    );
  },
});
