import { defineConfig } from 'vitepress'

const bookParts = [
  {
    text: '🔥 第 0 步 · 五分钟热身',
    collapsed: false,
    items: [{ text: '5 分钟跑通你的第一个回测', link: '/book/warmup' }]
  },
  {
    text: '第一篇 · 认知篇（CH1-5）',
    collapsed: false,
    items: [
      { text: '本篇导读', link: '/book/part1/' },
      { text: '第 1 章 散户为什么亏钱', link: '/book/part1/ch1' },
      { text: '第 2 章 量化到底是什么', link: '/book/part1/ch2' },
      { text: '第 3 章 AI 时代学量化的新姿势', link: '/book/part1/ch3' },
      { text: '第 4 章 量化学习路线总图', link: '/book/part1/ch4' },
      { text: '第 5 章 边界与红线', link: '/book/part1/ch5' }
    ]
  },
  {
    text: '第二篇 · 筑基篇（CH6-10）',
    collapsed: true,
    items: [
      { text: '本篇导读', link: '/book/part2/' },
      { text: '第 6 章 Python 最小必需品', link: '/book/part2/ch6' },
      { text: '第 7 章 数据从哪来', link: '/book/part2/ch7' },
      { text: '第 8 章 第一个回测', link: '/book/part2/ch8' },
      { text: '第 9 章 回测报告人话指南', link: '/book/part2/ch9' },
      { text: '第 10 章 新手八大坑 ⭐', link: '/book/part2/ch10' }
    ]
  },
  {
    text: '第三篇 · 实战篇（CH11-20）',
    collapsed: true,
    items: [
      { text: '本篇导读', link: '/book/part3/' },
      { text: '第 11 章 策略家族图谱', link: '/book/part3/ch11' },
      { text: '第 12 章 案例：ETF 动量轮动', link: '/book/part3/ch12' },
      { text: '第 13 章 案例：红利低波', link: '/book/part3/ch13' },
      { text: '第 14 章 案例：小市值', link: '/book/part3/ch14' },
      { text: '第 15 章 案例：多因子选股', link: '/book/part3/ch15' },
      { text: '第 16 章 案例：可转债策略', link: '/book/part3/ch16' },
      { text: '第 17 章 案例：B 圈 7×24', link: '/book/part3/ch17' },
      { text: '第 18 章 择时与仓位', link: '/book/part3/ch18' },
      { text: '第 19 章 用 AI 写策略的正确姿势', link: '/book/part3/ch19' },
      { text: '第 20 章 AI 生成代码验货指南 ⭐', link: '/book/part3/ch20' }
    ]
  },
  {
    text: '第四篇 · AI 协作篇（CH21-27）',
    collapsed: true,
    items: [
      { text: '本篇导读', link: '/book/part4/' },
      { text: '第 21 章 用 AI 学量化的正确姿势', link: '/book/part4/ch21' },
      { text: '第 22 章 提示词模板库', link: '/book/part4/ch22' },
      { text: '第 23 章 开源 AI 量化工具横评', link: '/book/part4/ch23' },
      { text: '第 24 章 AI 生成代码验货进阶', link: '/book/part4/ch24' },
      { text: '第 25 章 知识管理：把碎片变成体系', link: '/book/part4/ch25' },
      { text: '第 26 章 持续迭代：跟市场一起进化', link: '/book/part4/ch26' },
      { text: '第 27 章 从读到用：个人 AI 量化工作台', link: '/book/part4/ch27' }
    ]
  },
  {
    text: '附录（随手查）',
    collapsed: true,
    items: [
      { text: '附录总览', link: '/book/appendix/' },
      { text: '附录 A 术语速查表', link: '/book/appendix/a-terms' },
      { text: '附录 B 平台与工具对比', link: '/book/appendix/b-tools' },
      { text: '附录 C 避坑自查清单', link: '/book/appendix/c-checklists' },
      { text: '附录 D 常用代码模板', link: '/book/appendix/d-templates' },
      { text: '附录 E 学习资源导航', link: '/book/appendix/e-resources' }
    ]
  }
]

export default defineConfig({
  lang: 'zh-CN',
  title: 'AI 量化橙皮书',
  description: '一本免费开源的在线读本：量化知识 + AI 知识双主线，从零学量化，用 AI 提效，把每一步的坑提前踩给你看。',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#F97316' }]
  ],
  themeConfig: {
    siteTitle: '🍊 AI 量化橙皮书',
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '开始阅读', link: '/book/' },
      { text: '帮你解决', link: '/solve/' },
      { text: '阅读指南', link: '/guide/' },
      { text: '关于猫哥', link: '/about/' }
    ],
    sidebar: {
      '/book/': bookParts
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/Cat-Geek' }],
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一章', next: '下一章' },
    lastUpdated: { text: '最后更新' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
