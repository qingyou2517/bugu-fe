import { defineComponent } from "vue";
import s from "./welcome.module.scss";

export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.card}>
        <svg>
          <use xlinkHref='#cloud'></use>
        </svg>
        <h3>云备份<br />再也不丢失数据</h3>
      </div>
    );
  },
}); 
