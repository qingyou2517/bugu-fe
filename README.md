## 编码规范

### ref 默认值

推荐使用

```tsx
const divRef = ref<HTMLDivElement>();
```

不推荐使用

```tsx
const divRef = ref<HTMLDivElement | null>(null);
```

## 项目博客

语雀：https://www.yuque.com/qingyou-tkchw/zlbgxd/oxgcgoymsia1dnc3
