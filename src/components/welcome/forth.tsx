import { defineComponent } from "vue";
import s from "./welcome.module.scss";
import cloud from "../../assets/icons/cloud.svg"

export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.card}>
        <img src={cloud} />
        <h3>云备份<br />再也不丢失数据</h3>
      </div>
    );
  },
}); 
