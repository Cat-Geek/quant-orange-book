# AI 量化橙皮书（quant-orange-book）

## 一句话定位

「猫哥AI量化」的免费开源在线读本：量化知识 + AI 知识双主线，VitePress 静态站，线上地址 https://catquant.cn 。

## 怎么跑

```bash
pnpm install && pnpm dev    # 开发，http://localhost:3081
pnpm build                  # 构建，产物 docs/.vitepress/dist
```

## 技术栈

- VitePress 1.6（`"type": "module"`，配置在 `docs/.vitepress/config.ts`）
- pnpm ≥10；构建脚本白名单在 `pnpm-workspace.yaml`（`onlyBuiltDependencies: [esbuild]`），不认 package.json 的 pnpm 字段
- 主题定制全在 `docs/.vitepress/theme/custom.css`（橙色 #F97316、三种 callout：warning=坑位 / tip=人话翻译 / info=自查清单）
- 交互演示是 `docs/public/demos/` 下的纯前端 HTML，用 iframe 嵌入章节

## 目录与约定

- `docs/book/` 热身 + 四篇 27 章 + 附录 A-E；章节名 `partN/chN.md`；侧栏在 config.ts 里手工维护，加章必须同步
- 已发布章带 `<span class="chip hot">✅ 已发布</span>`，写作中章带 `<span class="ob-wip">写作中</span>`
- 每章固定结构：学完这章你能 → 正文 → 自查清单 → 下一章预告
- 内容红线：不荐股、不承诺收益、不含实盘操作指导（产品决策，见 `../AI量化工具站产品方向规划.md` v2.2）

## 部署与当前状态

- 托管 GitHub Pages，**源 = gh-pages 分支根**（token 无 workflow scope，不能走 Actions）：本地 `pnpm build` 后把 dist 内容（含 `.nojekyll`、`CNAME`）推到 gh-pages
- 域名 `catquant.cn`（Cat-Geek 账号）；DNS 仅两条：`@` A 185.199.108.153、`www` CNAME Cat-Geek.github.io
- 状态（2026-09-05）：HTTP 已上线；HTTPS 证书 GitHub 自动签发中；内容进度：热身/CH1/CH8/CH10/附录AC 全量，其余为骨架

## 下一步

- HTTPS 就绪后确认强制加密已开（`gh api -X PUT repos/Cat-Geek/quant-orange-book/pages -f https_enforced=true`）
- 每周 2 章铺量；公众号文末挂站点入口
