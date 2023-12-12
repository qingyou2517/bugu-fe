import { ref } from "vue";
import { AxiosResponse } from "axios";

type Fetcher = (page: number) => Promise<AxiosResponse<Resources<Tag>>>;

export const useTags = (getData: Fetcher) => {
  // List
  const loading = ref(false);
  const finished = ref(false);
  const page = ref(0); // 从0开始，方便外界传递请求函数时：参数{page: page+1}
  const hasMorePage = ref(true); // 有下一页
  const tagsList = ref<Tag[]>([]);
  const hasGetPage = ref<Boolean[]>([]); // 标记某页码是否已经获取过数据

  const getTagsList = async () => {
    const res = await getData(page.value); // 调用传递过来的 get 请求函数
    const { resources, pager } = res.data;

    hasMorePage.value = tagsList.value.length < pager.count;
    if (!hasGetPage.value[pager.page]) {
      tagsList.value.push(...resources);
      page.value++;
    }
    // 标记该页码已经获取过数据，防止把重复 get 的数据push到tagsList
    hasGetPage.value[pager.page] = true;
    if (tagsList.value.length >= pager.count) {
      hasMorePage.value = false;
    }
    loading.value = false;
    return res;
  };
  let res = getTagsList();

  // List组件的触底加载
  const handleLoadList = () => {
    // 让 get 之后才能再次 get
    res.then(() => {
      if (hasMorePage.value) {
        getTagsList();
      } else {
        finished.value = true;
      }
    });
  };

  return {
    page,
    tagsList,
    loading,
    hasMorePage,
    finished,
    handleLoadList,
  };
};
