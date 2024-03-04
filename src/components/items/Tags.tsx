import { defineComponent, PropType, ref } from "vue";
import s from "./Tags.module.scss";
import { List } from "vant";
import { useTags } from "../../shared/useTags";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { useRouter } from "vue-router";

export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true,
    },
    selectTagId: {
      type: Number as PropType<number>,
    },
  },
  emits: ["update:selectTagId"],
  setup: (props, context) => {
    const router = useRouter();
    const { tagsList, loading, finished, handleLoadList } = useTags((page) => {
      const res = http.get<Resources<Tag>>("/tags", {
        kind: props.kind,
        page: page + 1,
        _mock: "tagIndex",
      });
      return res;
    });

    // 让tabs切换时，清空tag的选择标记、重置List组件的加载状态
    const reset = () => {
      loading.value = false;
      finished.value = false;
      context.emit("update:selectTagId", -1);
    };
    context.expose({ reset });

    // 选择标签
    const selectTag = (tag: Tag) => {
      context.emit("update:selectTagId", tag.id);
    };
    const handleClickAdd = () => {
      context.emit("update:selectTagId", -1);
      router.push(`/tags/create?kind=${props.kind}`);
    };

    // 长按编辑
    let timer: ReturnType<typeof setTimeout>;
    const currentTag = ref<HTMLDivElement>();
    const longPress = (id: number) => {
      router.push(`/tags/${id}/edit?kind=${props.kind}`);
    };
    const handleTouchstart = (e: TouchEvent, tag: Tag) => {
      currentTag.value = e.currentTarget as HTMLDivElement;
      timer = setTimeout(() => {
        longPress(tag.id);
      }, 800);
    };
    const handleTouchend = (tag: Tag) => {
      clearTimeout(timer);
    };
    const handleTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientY
      );
      if (
        currentTag.value !== pointedElement &&
        currentTag.value?.contains(pointedElement) === false
      ) {
        clearTimeout(timer);
      }
    };
    return () => (
      <List
        class={s.tags_wrapper}
        v-model:loading={loading.value}
        finished={finished.value}
        finished-text=""
        immediate-check={false}
        onLoad={() => handleLoadList()}
        onTouchmove={handleTouchMove}
      >
        <div class={s.tag} onClick={() => handleClickAdd()}>
          <div class={s.sign}>
            <Icon name="addTag" class={s.createTag} />
          </div>
          <div class={s.name}>新增</div>
        </div>
        {tagsList.value.map((tag) => (
          <div
            class={[s.tag, props.selectTagId === tag.id ? s.selected : ""]}
            onClick={() => selectTag(tag)}
            onTouchstart={(e) => handleTouchstart(e, tag)}
            onTouchend={() => handleTouchend(tag)}
          >
            <div class={s.sign}>
              <svg class={s.svgIcon}>
                <use xlinkHref={"#" + tag.sign}></use>
              </svg>
            </div>
            <div class={s.name}>{tag.name}</div>
          </div>
        ))}
      </List>
    );
  },
});
