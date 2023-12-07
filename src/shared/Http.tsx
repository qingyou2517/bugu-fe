import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

type JSONValue =
  | string
  | number
  | null
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue };

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
    query?: Record<string, string>,
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

// 响应拦截
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
        alert("你太频繁了");
      }
    }
    throw error;
  }
);
