import { defineComponent, PropType, reactive, ref } from "vue";
import s from "./DateSelectDialog.module.scss";
import {
  Overlay,
  Form,
  Field,
  Button,
  DatePicker,
  Popup,
  showToast,
} from "vant";
import dayjs from "dayjs";

export const DateSelectDialog = defineComponent({
  props: {
    show: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    startDate: {
      type: String as PropType<string>,
    },
    endDate: {
      type: String as PropType<string>,
    },
    limitGap: {
      type: Number,
    },
  },
  setup: (props, context) => {
    // 时间选择对话框：使用Overlay、Form来封装
    const show = ref(false);
    const formRef = ref(null);
    // 日期格式: 2020-1-1
    const formData = reactive({
      startDate: "",
      endDate: "",
    });
    const openOverlay = () => {
      show.value = true;
    };
    const closeOverlay = () => {
      show.value = false;
    };
    const handleOk = () => {
      if (!formData.startDate || !formData.endDate) {
        showToast({
          type: "fail",
          duration: 1500,
          message: "请选择两个日期",
        });
        return;
      }
      if (dayjs(formData.endDate).isBefore(dayjs(formData.startDate))) {
        // 注意字符串1-1会比09-1大，所以日期为字符串时，不应该直接用字符串比较
        showToast({
          type: "fail",
          duration: 1500,
          message: "结束时间必须大于开始时间",
        });
        return;
      }
      if (
        props.limitGap &&
        dayjs(formData.endDate).diff(formData.startDate, "year", true) >
          props.limitGap
      ) {
        showToast({
          type: "fail",
          duration: 1500,
          message: "间隔不能超过1年",
        });
        return;
      }
      context.emit("update:startDate", dayjs(formData.startDate).format());
      context.emit("update:endDate", dayjs(formData.endDate).format());
      closeOverlay();
    };
    context.expose({ openOverlay });

    // 选择日期
    const refShowPop = ref(false);
    const dateString = dayjs(new Date()).format().split("T")[0]; // 2023-11-24
    const refDate = ref(dateString.split("-")); // [2023,11,24]
    let temp = refDate.value;
    const kind = ref(""); // "start"即起始时间，"end"即结束时间
    const showPopup = (str: string) => {
      kind.value = str;
      refShowPop.value = true;
    };
    const handleConfirm = (date: any) => {
      temp = date.selectedValues;
      if (kind.value === "start") {
        formData.startDate = date.selectedValues.join("-");
      } else if (kind.value === "end") {
        formData.endDate = temp.join("-");
      }
      refShowPop.value = false;
    };
    const handleCancel = () => {
      refDate.value = temp;
      refShowPop.value = false;
    };
    return () => (
      <>
        <Overlay show={show.value} class={s.overlay} duration={0.3}>
          <div class={s.overlay_inner}>
            <header>请选择时间</header>
            <main>
              <Form ref={formRef}>
                <label class={s.label_wrapper}>
                  <span class={s.title}>开始时间</span>
                  <Field
                    label=""
                    class="input_wrapper"
                    readonly={true}
                    placeholder="点击选择日期"
                    v-model={formData.startDate}
                    onClick={() => showPopup("start")}
                  ></Field>
                </label>
                <label class={s.label_wrapper}>
                  <span class={s.title}>结束时间</span>
                  <Field
                    label=""
                    class="input_wrapper"
                    readonly={true}
                    placeholder="点击选择日期"
                    v-model={formData.endDate}
                    onClick={() => showPopup("end")}
                  ></Field>
                </label>
                <div class={s.actions}>
                  <Button
                    type="default"
                    size="small"
                    onClick={() => closeOverlay()}
                  >
                    取消
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => handleOk()}
                    class={s.ok}
                  >
                    确定
                  </Button>
                </div>
              </Form>
            </main>
            <Popup position="bottom" v-model:show={refShowPop.value}>
              <DatePicker
                v-model={refDate.value}
                type="date"
                title="选择年月日"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            </Popup>
          </div>
        </Overlay>
      </>
    );
  },
});
