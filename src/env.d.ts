/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

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
  kind: "expense" | "income"
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
  tags_id: number[]
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

// 统计图表
type Data = {
  happened_at: string
  amount: number
}