import { computed, defineComponent, onMounted, PropType, ref } from "vue";

import { emojiList } from "./emojiList";

import s from "./EmojiSelect.module.scss";

export const EmojiSelect = defineComponent({
  props: {
    modelValue: {
      type: String as PropType<string>,
    },
  },

  setup: (props, context) => {
    // 分类名对应的 emoji name
    const table: [string, string[]][] = [
      [
        "表情", ["face-smiling", "face-affection", "face-tongue", "face-hand", "face-neutral-skeptical", "face-sleepy", "face-unwell", "face-hat", "face-glasses",
          "face-concerned", "face-negative", "face-costume"],
      ],
      [
        "手势", ["hand-fingers-open", "hand-fingers-partial", "hand-single-finger", "hand-fingers-closed", "hands", "hand-prop", "body-parts"],
      ],
      [
        "人物", ["person", "person-gesture", "person-role", "person-fantasy", "person-activity", "person-sport", "person-resting"],
      ],
      [
        "衣服", ["clothing"]
      ],
      [
        "动物", ["cat-face", "monkey-face", "animal-mammal", "animal-bird", "animal-amphibian", "animal-reptile", "animal-marine", "animal-bug"],
      ],
      [
        "植物", ["plant-flower", "plant-other"]
      ],
      [
        "自然", ["sky & weather", "science"]
      ],
      [
        "食物", ["food-fruit", "food-vegetable", "food-prepared", "food-asian", "food-marine", "food-sweet"],
      ],
      [
        "运动", ["sport", "game"]
      ],
    ];

    // 点击切换nav
    const refSelected = ref(0);
    const onClickTab = (index: number) => {
      refSelected.value = index
    }

    const onClickEmoji = (emoji: string) => {
      context.emit('update:modelValue', emoji)
    }

    // 根据所选分类，展示该分类下的 emoji 图标
    const emojis = computed(() => {
      const selectedItem = table[refSelected.value][1]    // emoji name 数组
      return selectedItem.map(category =>
        emojiList.find(item => item[0] === category)?.[1]
          .map(item => <li class={item === props.modelValue ? s.selectedEmoji : ''}
            onClick={() => onClickEmoji(item)}>{item}</li>)
      )
    })


    // 动态获取 emojiList 的宽度 => 用于计算nav导航栏的宽度、设置横向滚动
    const navWidth = ref(0)
    onMounted(() => {
      const el = document.getElementById("emojiList") as Element
      navWidth.value = Number(getComputedStyle(el).width.split('px')[0]) - 12
    })

    return () => (
      <div class={s.emojiList} id='emojiList'>
        <nav style={{ width: navWidth.value + 'px' }}>
          {table.map((item, index) => (
            <span class={index === refSelected.value ? s.selected : ''} onClick={() => onClickTab(index)}>{item[0]}</span>
          ))}
        </nav>

        <ol>{emojis.value}</ol>
      </div >
    );
  },
});
