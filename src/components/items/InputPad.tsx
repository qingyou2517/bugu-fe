import { defineComponent, PropType, ref } from "vue";
import s from "./InputPad.module.scss";
import { DatePicker, Popup } from "vant";
import dayjs from "dayjs";
import { Icon } from "../../shared/Icon";

export const InputPad = defineComponent({
  props: {
    amount: {
      type: Number as PropType<number>,
    },
    happenAt: {
      type: String as PropType<string>,
    },
    onSubmit: {
      type: Function as PropType<() => void>,
    },
  },
  setup: (props, context) => {
    // 选择日期
    const refShowPop = ref(false);
    const dateString = dayjs(props.happenAt).format().split("T")[0]; // 2023-11-24
    const refDate = ref(dateString.split("-"));
    let temp = refDate.value;
    const handleConfirm = (date: any) => {
      temp = date.selectedValues;
      refShowPop.value = false;
      context.emit("update:happenAt", dayjs(temp.join("-")).toISOString());
    };
    const handleCancel = () => {
      refDate.value = temp;
      refShowPop.value = false;
    };
    // 数字键盘
    const refAmount = ref(props.amount ? props.amount.toString() : "0");
    const appendText = (n: number | string) => {
      const nString = n.toString(); // 0、小数点、1~9
      const dotIndex = refAmount.value.indexOf(".");
      // 阻止拼接
      if (refAmount.value.length >= 12) return;
      if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) {
        return;
      }
      if (nString === ".") {
        if (dotIndex >= 0) return; // 已经有小数点了
      } else if (nString === "0") {
        if (refAmount.value === "0") {
          // refAmount是0，且后面没有小数点时
          return;
        }
      }
      // 覆盖或拼接
      if (refAmount.value === "0" && nString !== ".") {
        refAmount.value = nString;
      } else {
        refAmount.value += nString;
      }
    };
    const remove = () => {
      let length = refAmount.value.length;
      if (length <= 1) {
        refAmount.value = "0";
      } else {
        refAmount.value = refAmount.value.substring(0, length - 1);
      }
    };
    const handleOK = () => {
      context.emit("update:amount", parseFloat(refAmount.value));
      refAmount.value = "0";
      props.onSubmit?.();
    };
    const buttonsList = [
      {
        text: "1",
        onClick: () => {
          appendText(1);
        },
      },
      {
        text: "2",
        onClick: () => {
          appendText(2);
        },
      },
      {
        text: "3",
        onClick: () => {
          appendText(3);
        },
      },
      {
        text: "4",
        onClick: () => {
          appendText(4);
        },
      },
      {
        text: "5",
        onClick: () => {
          appendText(5);
        },
      },
      {
        text: "6",
        onClick: () => {
          appendText(6);
        },
      },
      {
        text: "7",
        onClick: () => {
          appendText(7);
        },
      },
      {
        text: "8",
        onClick: () => {
          appendText(8);
        },
      },
      {
        text: "9",
        onClick: () => {
          appendText(9);
        },
      },
      {
        text: ".",
        onClick: () => {
          appendText(".");
        },
      },
      {
        text: "0",
        onClick: () => {
          appendText(0);
        },
      },
      {
        text: "删除",
        onClick: () => {
          remove();
        },
      },
      {
        text: "清空",
        onClick: () => {
          refAmount.value = "0";
        },
      },
      { text: "确认", onClick: () => handleOK() },
    ];

    return () => (
      <>
        <div class={s.dateAndAmount}>
          <span>
            <span class={s.date} onClick={() => (refShowPop.value = true)}>
              <Icon name="date" class={s.dateIcon} />
              <span>{refDate.value.join("-")}</span>
            </span>
            <Popup position="bottom" v-model:show={refShowPop.value}>
              <DatePicker
                v-model={refDate.value}
                type="date"
                title="选择年月日"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            </Popup>
          </span>
          <span class={s.amount}>{refAmount.value}</span>
        </div>
        <div class={s.buttons}>
          {buttonsList.map((button) => (
            <button onClick={button.onClick}>{button.text}</button>
          ))}
        </div>
      </>
    );
  },
});
