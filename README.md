# Frames

产品设计框架与软件开发框架合集。顶部 Tab 可在两套目录之间切换，数据、收藏和主题互不影响。

## 本地运行

```bash
npm install
npm run dev
```

打开 http://localhost:3000

## 产品框架

复刻 [pmframe.works](https://pmframe.works/)：

- `/` 首页：分类筛选、搜索（⌘K / Ctrl+K）、收藏、弹层与左右切换
- `/canvas` 框架地图：阶段 × 杠杆散点、分类高亮、悬停说明
- `/framework-{slug}` 100 个框架详情页（含技能笔记 `/skills/{slug}.md`）

## 开发框架

移植 [sdframe.caldis.me](https://sdframe.caldis.me/)（[Caldis/frameworks](https://github.com/Caldis/frameworks)）：

- `/dev` 首页：317 个软件设计框架、13 个分类、双语、筛选与收藏
- `/dev/frameworks/{slug}` 框架详情
- `/dev/category/{slug}` 分类页
- `/dev/map` 关系地图
- `/dev/compare` 对比
- `/dev/selector` 选择器
- `/dev/paths` 学习路径
- `/dev/insights` 统计
- `/dev/timeline` 时间线
- `/dev/agent` Agent 入口
- 静态 API 与文档：`/api/frameworks.index.json`、`/skill/SKILL.md`、`/docs/` 等
