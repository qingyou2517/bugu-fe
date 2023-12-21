import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import {
  mockItemCreate,
  mockItemIndex,
  mockItemIndexBalance,
  mockSession,
  mockTagCreate,
  mockTagDelete,
  mockTagEdit,
  mockTagIndex,
  mockTagShow,
} from "../mock/mock";
import { showDialog } from "vant";

export class Http {
  instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }
  // read
  get<R = unknown>(
    url: string,
    query?: Record<string, string | number>,
    config?: Omit<AxiosRequestConfig, "params" | "url" | "method">
  ) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: "get",
    });
  }
  // create
  post<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">
  ) {
    return this.instance.request<R>({ ...config, url, data, method: "post" });
  }
  // update
  patch<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">
  ) {
    return this.instance.request<R>({ ...config, url, data, method: "patch" });
  }
  // destroy
  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "params">
  ) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: "delete",
    });
  }
}

export const http = new Http("/api/v1");

const mock = (response: AxiosResponse) => {
  if (
    location.hostname !== "localhost" &&
    location.hostname !== "127.0.0.1" &&
    location.hostname !== "192.168.0.101"
  ) {
    return false;
  }
  switch (response.config?.params?._mock) {
    case "tagIndex":
      [response.status, response.data] = mockTagIndex(response.config);
      return true;
    case "itemCreate":
      [response.status, response.data] = mockItemCreate(response.config);
      return true;
    case "itemIndex":
      [response.status, response.data] = mockItemIndex(response.config);
      return true;
    case "itemIndexBalance":
      [response.status, response.data] = mockItemIndexBalance(response.config);
      return true;
    case "tagCreate":
      [response.status, response.data] = mockTagCreate(response.config);
      return true;
    case "tagShow":
      [response.status, response.data] = mockTagShow(response.config);
      return true;
    case "tagEdit":
      [response.status, response.data] = mockTagEdit(response.config);
      return true;
    case "tagDelete":
      [response.status, response.data] = mockTagDelete(response.config);
      return true;
    case "session":
      [response.status, response.data] = mockSession(response.config);
      return true;
  }
  return false;
};

// 请求拦截
http.instance.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      config.headers!.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 增加一个响应拦截器：用作 mock
http.instance.interceptors.response.use(
  (response) => {
    mock(response);
    if (response.status >= 400) {
      throw { response };
    } else {
      return response;
    }
  },
  (error) => {
    mock(error.response);
    if (error.response.status >= 400) {
      throw error;
    } else {
      return error.response;
    }
  }
);
// 响应拦截器：用作公共报错处理
http.instance.interceptors.response.use(
  (response) => {
    // 处理响应的数据
    // return response.data.data;
    return response;
  },
  (error) => {
    if (error.response) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        showDialog({
          message: "亲，重复点击了哟!",
        });
      }
    }
    throw error;
  }
);
