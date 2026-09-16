# PMFrame.works

用 Next.js、Tailwind CSS 与 shadcn/ui 复刻 [pmframe.works](https://pmframe.works/) 的全部页面、样式与交互。

## 本地运行

```bash
npm install
npm run dev
```

打开 http://localhost:3000

## 页面

- `/` 首页：分类筛选、搜索（⌘K / Ctrl+K）、收藏、弹层与左右切换
- `/canvas` 框架地图：阶段 × 杠杆散点、分类高亮、悬停说明
- `/framework-{slug}` 100 个框架详情页（含技能笔记下载 `/skills/{slug}.md`）
