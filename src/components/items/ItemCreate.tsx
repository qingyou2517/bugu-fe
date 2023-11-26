import { defineComponent, PropType, ref } from 'vue';
import s from './ItemCreate.module.scss';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs, Tag } from 'vant';
import { useRouter } from 'vue-router';
import { MainLayout } from '../../layouts/MainLayout';
import { InputPad } from './InputPad';

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const router = useRouter()
    // tab 切换
    const active = ref(0)
    const refExpensesTags = ref([
      { id: 1, name: '餐费', sign: '￥', category: 'expenses' },
      { id: 2, name: '打车', sign: '￥', category: 'expenses' },
      { id: 3, name: '聚餐', sign: '￥', category: 'expenses' },
      { id: 4, name: '打车', sign: '￥', category: 'expenses' },
      { id: 5, name: '聚餐', sign: '￥', category: 'expenses' },
      { id: 6, name: '打车', sign: '￥', category: 'expenses' },
      { id: 7, name: '聚餐', sign: '￥', category: 'expenses' },
    ])  // 支出
    const refIncomeTags = ref([
      { id: 4, name: '工资', sign: '￥', category: 'income' },
      { id: 5, name: '彩票', sign: '￥', category: 'income' },
      { id: 6, name: '滴滴', sign: '￥', category: 'income' },
      { id: 11, name: '彩票', sign: '￥', category: 'income' },
      { id: 18, name: '滴滴', sign: '￥', category: 'income' },
      { id: 17, name: '彩票', sign: '￥', category: 'income' },
      { id: 19, name: '滴滴', sign: '￥', category: 'income' },
      { id: 24, name: '工资', sign: '￥', category: 'income' },
      { id: 25, name: '彩票', sign: '￥', category: 'income' },
      { id: 26, name: '滴滴', sign: '￥', category: 'income' },
      { id: 211, name: '彩票', sign: '￥', category: 'income' },
      { id: 218, name: '滴滴', sign: '￥', category: 'income' },
      { id: 217, name: '彩票', sign: '￥', category: 'income' },
      { id: 219, name: '滴滴', sign: '￥', category: 'income' },
      { id: 34, name: '工资', sign: '￥', category: 'income' },
      { id: 35, name: '彩票', sign: '￥', category: 'income' },
      { id: 36, name: '滴滴', sign: '￥', category: 'income' },
      { id: 311, name: '彩票', sign: '￥', category: 'income' },
      { id: 318, name: '滴滴', sign: '￥', category: 'income' },
      { id: 317, name: '彩票', sign: '￥', category: 'income' },
      { id: 319, name: '滴滴', sign: '￥', category: 'income' },
      { id: 44, name: '工资', sign: '￥', category: 'income' },
      { id: 45, name: '彩票', sign: '￥', category: 'income' },
      { id: 46, name: '滴滴', sign: '￥', category: 'income' },
      { id: 411, name: '彩票', sign: '￥', category: 'income' },
      { id: 418, name: '滴滴', sign: '￥', category: 'income' },
      { id: 417, name: '彩票', sign: '￥', category: 'income' },
      { id: 419, name: '滴滴', sign: '￥', category: 'income' },
      { id: 54, name: '工资', sign: '￥', category: 'income' },
      { id: 55, name: '彩票', sign: '￥', category: 'income' },
      { id: 56, name: '滴滴', sign: '￥', category: 'income' },
      { id: 511, name: '彩票', sign: '￥', category: 'income' },
      { id: 518, name: '滴滴', sign: '￥', category: 'income' },
      { id: 517, name: '彩票', sign: '￥', category: 'income' },
      { id: 519, name: '滴滴', sign: '￥', category: 'income' },
    ])  // 收入
    
    // 选择标签
    const selectTagId = ref(-1)
    const isClickAdd = ref(false)
    interface Tag{
      id:number,
      name:string,
      sign:string,
      category:string
    }
    const selectTag = (tag: Tag)=>{
      selectTagId.value = tag.id
    }
    const ClickAdd=()=>{
      selectTagId.value = -1
      // router.push("/tags/create")
    }
    // tab切换时，清空之前标签的选择标记
    const changeTab=()=>{
      selectTagId.value = -1
    }
    const goBack = () => {
      // router.push("/items")
    }
    return () => (
      <MainLayout>{
        {
          title: () => "记一笔",
          icon: () => <Icon name="left" class={s.navIcon} onClick={goBack}></Icon>,
          default: () => <>
            <div class={s.wrapper}>
              <Tabs v-model:active={active.value} class={s.tabs} sticky offset-top={88} onChange={changeTab}>
                <Tab title="支出" class={s.tags_wrapper}>
                  <div class={s.tag} onClick={() => ClickAdd}>
                    <div class={s.sign}>
                      <Icon name="addTag" class={s.createTag} />
                    </div>
                    <div class={s.name}>
                      新增
                    </div>
                  </div>
                  {refExpensesTags.value.map(tag =>
                    <div class={[s.tag, selectTagId.value === tag.id ? s.selected:""]}    onClick={()=>selectTag(tag)}>
                      <div class={s.sign}>
                        {tag.sign}
                      </div>
                      <div class={s.name}>
                        {tag.name}
                      </div>
                    </div>
                  )}
                </Tab>
                <Tab title="收入" class={s.tags_wrapper}>
                  <div class={s.tag} onClick={() => ClickAdd}>
                    <div class={s.sign}>
                      <Icon name="addTag" class={s.createTag} />
                    </div>
                    <div class={s.name}>
                      新增
                    </div>
                  </div>
                  {refIncomeTags.value.map(tag =>
                    <div class={[s.tag, selectTagId.value === tag.id ? s.selected:""]}    onClick={()=>selectTag(tag)}>
                      <div class={s.sign}>
                        {tag.sign}
                      </div>
                      <div class={s.name}>
                        {tag.name}
                      </div>
                    </div>
                  )}     
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad />
              </div>
            </div>
          </>
        }
      }</MainLayout>
    )
  }
})