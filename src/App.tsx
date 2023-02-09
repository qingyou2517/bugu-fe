import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";

export const App = defineComponent({
  setup() {
    const refCount = ref(0)
    const onClick = ()=>{
      refCount.value += 1
    }
    return () => (
      <div>
        <RouterView />
      </div>
    )
  }
})
