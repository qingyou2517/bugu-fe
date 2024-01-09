import { computed, defineComponent, PropType, reactive, ref } from "vue";
import s from "./Bars.module.scss";
import { amountFormat } from "../../shared/format";

export const Bars = defineComponent({
  props: {
    data: {
      type: Array as PropType<(Data2 & { percent: number })[]>,
      required: true,
    },
  },
  setup: (props, context) => {
    // const data = computed<(Data2 & { percent: number })[]>(() => {
    //   if (!props.data) return [];
    //   if (props.data.length <= 1) {
    //     return [props.data[0]];
    //   } else if (props.data.length <= 2) {
    //     return [props.data[0], props.data[1]];
    //   } else {
    //     return [props.data[0], props.data[1], props.data[2]];
    //   }
    // });

    return () => (
      <div class={s.wrapper}>
        {props.data && props.data.length > 0 ? (
          props.data.map(({ tag, amount, percent }) => {
            return (
              <div class={s.topItem}>
                <div class={s.sign}>{tag.sign}</div>
                <div class={s.bar_wrapper}>
                  <div class={s.bar_text}>
                    <span>
                      {" "}
                      {tag.name} - {percent.toFixed(2)} %
                    </span>
                    <span> ￥{amount.toFixed(2)} </span>
                  </div>
                  <div class={s.bar}>
                    <div
                      class={s.bar_inner}
                      style={{ width: `${percent.toFixed(2)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div class={s.topItem}>
            <div class={s.sign}>无</div>
            <div class={s.bar_wrapper}>
              <div class={s.bar_text}>
                <span> 未知 - 0.00%</span>
                <span> ￥0.00 </span>
              </div>
              <div class={s.bar}>
                <div class={s.bar_inner}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
});
