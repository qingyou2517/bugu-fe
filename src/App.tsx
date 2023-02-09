import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";

export const App = defineComponent({
  setup() {
    const refCount = ref(0)
    const onClick = ()=>{
      refCount.value += 1
    }
    return () => <>
      <header>导航
        <ul>
          <li>
            <router-link to="/">Foo</router-link>
          </li>
          <li>
            <router-link to="/about">Bar</router-link>
          </li>
        </ul> 
      </header>
      <div>
        <RouterView />
      </div>
      <footer>页脚</footer>
    </>
  }
})
