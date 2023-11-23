import { defineComponent } from "vue";
import s from "./welcome.module.scss";

export const First = defineComponent({
  setup: (props, context) => {


    return () => (
      <div class={s.card} >
        <svg>
          <use xlinkHref='#pig'></use>
        </svg>
        <h3>会挣钱<br />还会省钱</h3>
      </div>
    );
  },
}); 
