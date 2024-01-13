/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare var isDev: boolean

type JSONValue =
  | string
  | number
  | null
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue };

type Tag = {
  id: number
  user_id?: number
  name: string
  sign: string
  kind: "expenses" | "income"
}

// 请求记账标签
type Resources<T = any> = {
  resources: T[]
  pager: {
    page: number,
    per_page: number,
    count: number
  }
}

// 发起记账
type Resource<T> = {
  resource: T
}
type Item = {
  id: number
  user_id: number
  amount: number
  tag_ids: number[]
  tags: Tag[]
  happen_at: string
  kind: "expenses" | "income"
}

type ResourceError = {
  errors: Record<string, string[]>
}

// 收支总结
type Balance = {
  income: number
  expenses: number
  balance: number
}

// 后台返回的折线图数据类型
type Data1 = {
  happened_at: string
  amount: number
}

// 后台返回的饼图数据类型
type TObj = {
  id: number
  name: string
  sign: string
}
type Data2 = {
  tag_id: number
  tag: TObj
  amount: number
}

// 用户信息
type UserInfo = {
  id: number
  email: string
}