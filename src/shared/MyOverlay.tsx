import { defineComponent, PropType } from "vue";
import s from "./MyOverlay.module.scss";
import { RouterLink, useRouter } from "vue-router";
import { Icon } from "./Icon";
import { useMeStore } from "../stores/useMeStore";
import { storeToRefs } from "pinia";
import { showConfirmDialog } from "vant";

export const MyOverlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup: (props, context) => {
    const router = useRouter();
    // 用户数据
    const meStore = useMeStore();
    const { userInfo } = storeToRefs(meStore);
    const { resetUserInfo } = meStore;

    // 点击登录
    const login = () => {
      router.push("/sign_in?return_to=/items");
    };
    // 退出登录
    const loginOut = async () => {
      await showConfirmDialog({
        title: "是否退出登录",
        message: `当前账号为: ${userInfo.value.email}`,
      })
        .then(() => {
          resetUserInfo();
          localStorage.removeItem("jwt");
        })
        .catch((err) => {
          // console.log(err);
        });
    };

    return () => (
      <>
        <div
          class={s.mask}
          onClick={(e: MouseEvent) => props.onClose?.(e)}
        ></div>
        <div class={s.overlay}>
          {userInfo.value.email ? (
            <section class={s.currentUser}>
              <div class={s.userInfo}>
                <Icon name="user" class={s.userIcon}></Icon>
                <h2 class={s.email}>{userInfo.value.email}</h2>
              </div>
              <div class={s.logout} onClick={loginOut}>
                <Icon name="logout" class={s.logoutIcon}></Icon>
                <h2>点击退出登录</h2>
              </div>
            </section>
          ) : (
            <section class={s.currentUser}>
              <div class={s.userInfo}>
                <Icon name="user" class={s.userIcon}></Icon>
                <h2 class={s.email}>未登录</h2>
              </div>
              <div class={s.logout} onClick={login}>
                <Icon name="login" class={s.logoutIcon}></Icon>
                <h2>点击这里登录</h2>
              </div>
            </section>
          )}
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to="/statistics" class={s.action}>
                  <Icon name="statistics" class={s.asideIcon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={s.action}>
                  <Icon name="export" class={s.asideIcon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/classify" class={s.action}>
                  <Icon name="classify" class={s.asideIcon} />
                  <span>自定义分类</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notify" class={s.action}>
                  <Icon name="notify" class={s.asideIcon} />
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  },
});
