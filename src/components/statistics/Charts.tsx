import { computed, defineComponent, PropType, reactive, ref, watch } from "vue";
import s from "./Charts.module.scss";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { Bars } from "./Bars";
import dayjs from "dayjs";
import { http } from "../../shared/Http";
import { MySelect } from "../../shared/MySelect";
import { amountFormat } from "../../shared/format";

export const Charts = defineComponent({
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
    // 下拉选择
    const options = reactive([
      { value: "expenses", text: "支出" },
      { value: "income", text: "收入" },
    ]);
    const kind = ref<"expenses" | "income">("expenses");

    // 是否按天展示
    const showByDay = computed(() => {
      const gap = dayjs(props.endDate).diff(props.startDate, "day");
      if (gap + 1 <= 31) {
        return true;
      } else {
        return false;
      }
    });

    // 折线图数据
    const data1 = ref<Data1[]>([]);
    const lineData_byDay = computed<[string, number][]>(() => {
      let n = dayjs(props.endDate).diff(props.startDate, "day") + 1;
      let index = 0;
      let array: [string, number][] = [];
      // 使用时间戳来判断是否属于同一天
      for (let i = 0; i < n; i++) {
        const time = dayjs(props.startDate).add(i, "day").valueOf();
        if (
          data1.value[index] &&
          time === dayjs(data1.value[index].happened_at).valueOf()
        ) {
          array.push([
            data1.value[index].happened_at,
            data1.value[index].amount,
          ]);
          index++;
        } else {
          const date = dayjs(props.startDate)
            .add(i, "day")
            .format("YYYY-MM-DD");
          array.push([date, 0]);
        }
      }
      for (let i = n; i < 31; i++) {
        const date = dayjs(props.startDate).add(i, "day").format("YYYY-MM-DD");
        array.push([date, 0]);
      }
      return array;
    });
    const lineData_byMonth = computed<[string, number][]>(() => {
      if (showByDay.value) return [];
      let n = dayjs(props.endDate).diff(props.startDate, "month") + 1;
      let index = 0;
      let iTemp = 0;
      let amount = 0;
      let array: [string, number][] = [];

      for (let i = 0; i < n; i++) {
        if (data1.value[index]) {
          const date1 = dayjs(props.startDate).add(i, "month");
          for (let j = index; j < data1.value.length; j++) {
            const date2 = dayjs(data1.value[j].happened_at);
            const isSameMonth = date1.isSame(date2, "month"); // 是否属于同一月
            if (isSameMonth) {
              amount += data1.value[index].amount;
              index = j + 1;
              if (j === data1.value.length - 1) {
                array.push([date1.format("YYYY-MM"), amount]);
                amount = 0;
                iTemp = i + 1;
              }
            } else {
              array.push([date1.format("YYYY-MM"), amount]);
              amount = 0;
              break;
            }
          }
        }
      }
      for (let i = iTemp; i < 12; i++) {
        const date = dayjs(props.startDate).add(i, "month");
        array.push([date.format("YYYY-MM"), 0]);
      }
      return array;
    });
    const getLineData = async () => {
      try {
        const res = await http.get<{ groups: Data1[]; amount: number }>(
          "/items/summary",
          {
            happened_after: props.startDate,
            happen_before: props.endDate,
            kind: kind.value,
            _mock: "itemSummary",
            group_by: "happened_at",
            _autoLoading: true,
          }
        );
        data1.value = res.data.groups;
      } catch (err) {
        console.error("getLineData error:", err);
      }
    };
    getLineData();

    // 饼图数据
    const data2 = ref<Data2[]>([]);
    const pieData = computed<{ name: string; value: number }[]>(() => {
      // js return 一个对象时，必须用括号包裹
      return data2.value.map((item) => ({
        name: item.tag.name,
        value: item.amount,
      }));
    });
    const getPieData = async () => {
      try {
        const res = await http.get<{ groups: Data2[]; amount: number }>(
          "/items/summary",
          {
            happened_after: props.startDate,
            happen_before: props.endDate,
            kind: kind.value,
            _mock: "itemSummary",
            group_by: "tag_id",
          }
        );
        data2.value = res.data.groups;
      } catch (err) {
        console.error("getLineData error:", err);
      }
    };
    getPieData();

    // 条形图
    const barsData = computed<(Data2 & { percent: number })[]>(() => {
      const total = data2.value.reduce((sum, item) => sum + item.amount, 0);
      const array = data2.value.map((item) => ({
        ...item,
        percent: (item.amount / total) * 100,
      }));
      // 从大到小排序，最终只取金额最大的三项组成数组，作为条形图的数据来源
      array.sort((a, b) => b.percent - a.percent);
      if (array.length <= 0) {
        return [];
      } else if (array.length <= 1) {
        return [array[0]];
      } else if (array.length <= 2) {
        return [array[0], array[1]];
      } else {
        return [array[0], array[1], array[2]];
      }
    });

    // 自定义时间：使用watch监听日期的改变
    watch(
      () => [props.startDate, props.endDate],
      () => {
        getLineData();
      }
    );

    // 切换"支出"/"收入"时，重新请求数据
    watch(
      () => kind.value,
      () => {
        getLineData();
        getPieData();
      }
    );

    return () => (
      <div class={s.wrapper}>
        <div class={s.select_wrapper}>
          <MySelect options={options} v-model={kind.value} />
        </div>
        <div class={s.lineChart_wrapper}>
          {showByDay.value ? (
            <LineChart
              class={s.lineChart1}
              data={lineData_byDay.value}
              showByDay={showByDay.value}
            />
          ) : (
            <LineChart
              class={s.lineChart2}
              data={lineData_byMonth.value}
              showByDay={showByDay.value}
            />
          )}
        </div>
        <PieChart data={pieData.value} />
        <Bars data={barsData.value} />
      </div>
    );
  },
});
