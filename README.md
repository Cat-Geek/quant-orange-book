# AI 量化橙皮书 🍊

一本免费开源的结构化在线读本：**量化知识 + AI 知识**双主线。

- 在线阅读：<https://catquant.cn>
- 公众号：猫哥AI量化
- 深度源码与陪跑：知识星球

## 本地开发

```bash
pnpm install
pnpm dev      # http://localhost:3081
pnpm build    # 产物在 docs/.vitepress/dist
```

## 部署（gh-pages 分支方案）

托管在 GitHub Pages，源为 `gh-pages` 分支根目录，绑定域名 `catquant.cn`（已通过 Pages CNAME 文件登记）。

> 为什么不是 GitHub Actions：仓库 token 无 `workflow` scope，workflow 文件推送会被拒，故采用本地构建直推。

```bash
pnpm build
# 将 docs/.vitepress/dist 内容推到 gh-pages 分支（含 .nojekyll 与 CNAME 两个隐藏/特殊文件）
```

DNS（域名注册商处，已配置）：`@` A 185.199.108.153（免费套餐限两条记录，其余 3 个 GitHub IP 未加）；`www` CNAME Cat-Geek.github.io。

## 目录结构

```
docs/
├── .vitepress/     # 配置与橙色主题
├── index.md        # 首页
├── book/           # 正文：热身 + 四篇 27 章 + 附录
├── public/demos/   # 交互演示（迷你回测、未来函数）
├── solve/          # 帮你解决（按问题直达）
├── guide/          # 阅读指南（三条路线）
└── about/          # 关于
```

## 合规声明

全部内容仅作知识分享与技术教学，不构成投资建议；不荐股、不代客理财、不承诺收益。
