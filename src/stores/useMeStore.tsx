import { http } from "../shared/Http";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMeStore = defineStore("me", () => {
  const userInfo = reactive({
    email: "",
  });
  const getUserInfo = async () => {
    try {
      const res = await http.get<Resource<UserInfo>>("/me");
      const { resource } = res.data;
      userInfo.email = resource.email;
    } catch (err) {
      console.error("获取用户数据失败：", err);
    }
  };
  const resetUserInfo = () => {
    userInfo.email = "";
  };

  return {
    userInfo,
    getUserInfo,
    resetUserInfo,
  };
});
