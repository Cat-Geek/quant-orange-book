# P1 · 聚宽 JoinQuant 上手

<div class="ob-meta">
<span class="chip">平台手册 · P1</span><span class="chip">⏱ 跟做约 40 分钟</span><span class="chip hot">✅ 全量发布</span>
</div>

::: tip 🎯 跟完这页你能
- 注册聚宽、认识研究环境与回测环境
- 跑通你的第一个**真实数据**回测（不是模拟器）
- 掌握 12 个最高频 API，看懂每一行平台代码
- 避开聚宽平台特有的 4 个未来函数陷阱
:::

## 1. 聚宽是什么，适合谁

**聚宽（JoinQuant）是一个跑在浏览器里的量化平台**：代码、数据、回测引擎全在云端，你只需要一个浏览器。它是本书认定的**新手第一站**，理由有三：

- **零安装**：不用配 Python 环境，注册就能写策略
- **文档全中文**，社区案例多，遇到问题搜得到
- **数据内置**：行情、财务数据开箱即用，省掉数据工程这一整层

**不适合谁**：想脱离网页做本地化工程的人（那是 QMT 的舞台，远期再说）。

## 2. 三步动起来

1. **注册**：打开 [joinquant.com](https://www.joinquant.com) → 注册登录（免费账户够学习用）
2. **认识两个环境**：
   - **研究环境**：类 Jupyter Notebook，用来探索数据、画图分析——你的"实验室"
   - **回测环境**：写策略、跑回测的地方——你的"考场"
3. **新建策略**：进入"我的策略" → 新建策略 → 选"股票"，你会看到平台预置的策略模板

## 3. 跑通第一个回测：逐行人话注释

下面是一个**完整可运行**的双均线策略（在平台预置代码基础上改就行）。每一行都值得读懂——读不懂的行，用[第 21 章](/book/part4/ch21)的 AI 私教法问 AI。

```python
# 导入聚宽函数库（官方模板自带）
import jqdata

# 初始化函数：整个回测生命周期只跑一次，负责"布置考场"
def initialize(context):
    # 全局变量 g：保存要操作的股票——000001.XSHE 是平安银行
    # 后缀规则：.XSHE = 深交所，.XSHG = 上交所
    g.security = '000001.XSHE'
    # 设定基准：策略收益要跟沪深300比，不然不知道自己强不强
    set_benchmark('000300.XSHG')
    # 开启动态复权模式（真实价格）——避免除权造成的假价格
    set_option('use_real_price', True)
    # 每天：market_open 函数会被调用一次
    run_daily(market_open, time='every_bar')

# 每个交易日执行一次的主逻辑
def market_open(context):
    security = g.security
    # 取过去 5 天的收盘价（注意：不含今天——没有未来函数）
    close_data = attribute_history(security, 5, '1d', ['close'])
    # 过去 5 天均价（MA5）
    MA5 = close_data['close'].mean()
    # 上一时间点的价格
    current_price = close_data['close'][-1]
    # 当前可用现金
    cash = context.portfolio.available_cash

    # 价格高出 MA5 的 1% → 全仓买入（趋势开始的信号）
    if current_price > 1.01 * MA5:
        order_value(security, cash)          # 用全部现金买入
        log.info("Buying %s" % (security))
    # 价格跌破 MA5 → 清仓（趋势结束的信号）
    elif current_price < MA5 and context.portfolio.positions[security].closeable_amount > 0:
        order_target(security, 0)            # 把持仓调到 0，即清仓
        log.info("Selling %s" % (security))
    # 把价格画到收益图上，回测完能看到
    record(stock_price=current_price)
```

**点"编译运行"**，跑完后你会看到：收益曲线、与基准的对比、每一笔交易记录。恭喜——第 8 章的仪式感，你已经提前完成了。

::: tip 💡 读代码的三个抓手
- `initialize` = 布置考场（只跑一次），`market_open` = 每天答题（反复跑）——所有聚宽策略都是这个骨架
- `g.xxx` 是全局变量，`context` 是当天的考场信息（现金、持仓、时间）
- `attribute_history` 默认**不含今天**——这是它"没有未来"的原因，也是它安全的原因
:::

## 4. 高频 API 速查 12 个

**框架三件套**

| API | 一句话 |
|---|---|
| `initialize(context)` | 初始化，只跑一次：设标的、基准、费用、运行计划 |
| `run_daily(func, time='every_bar')` | 定时任务：每天/每分钟调用你的函数 |
| `set_benchmark('000300.XSHG')` | 设基准，收益曲线有了对照组 |

**数据四件套**

| API | 一句话 | 关键注意 |
|---|---|---|
| `attribute_history(股票, N, '1d', fields)` | 单标的多字段历史，**默认不含今天、默认跳过停牌** | 新手最安全的数据 API |
| `history(N, '1d', field)` | 多标的单字段，返回 DataFrame | 天数据不含当天 |
| `get_price(标的, end_date=...)` | 最灵活的历史数据 API | ⚠️ `end_date` 不要大于 `context.current_dt`，**否则引入未来函数**（官方文档原话） |
| `get_bars(...)` | 各种周期 bar，支持非标准周期 | 进阶再碰 |

**交易三件套**

| API | 一句话 |
|---|---|
| `order(股票, 数量)` | 按股数下单，负数=卖出 |
| `order_value(股票, 金额)` | 按金额买（`cash` 全仓买入常用它） |
| `order_target(股票, 目标持仓)` | 调仓到指定股数，`0` = 清仓 |

**辅助两件套**

| API | 一句话 |
|---|---|
| `record(名字=值)` | 把自定义数值画到回测图表上 |
| `log.info(...)` | 往日志里写字，复盘的好帮手 |

## 5. 聚宽平台专属坑（都写在官方文档里，但没人提醒你看）

::: warning ⚠️ 坑位 1：get_price 的 end_date 就是未来函数入口
官方文档原话：**"传入的值不要大于 context.current_dt，否则会引入未来函数"**。AI 生成的代码最爱犯这条——用 `get_price` 时 end_date 写死了今天的日期，回测里就是偷看未来。
:::

::: warning ⚠️ 坑位 2：停牌日的"填充价"
`get_price` 默认**不跳过停牌**，停牌日用停牌前价格填充。你以为价格连续，其实那几天根本没交易。要跳过：`skip_paused=True`。对照第 10 章[坑六：数据乌龙](/book/part2/ch10)。
:::

::: warning ⚠️ 坑位 3：count 和 start_date 二选一
`get_price` 里这两个参数**不可同时使用**，同时给会报错或行为怪异。AI 生成的代码经常俩都给。
:::

::: warning ⚠️ 坑位 4：复权选项 fq 默认前复权
`fq='pre'` 是默认值——学习期没问题，但要知道它存在：换个复权口径，历史价格会整体变化。参数 `None`（不复权）/`'post'`（后复权）的差异，回看[第 7 章](/book/part2/ch7)复权那节。
:::

## 6. 衔接地图：这个平台对应主线哪几章

| 你在聚宽遇到的事 | 去读 |
|---|---|
| 第一个回测的完整仪式感 | [第 8 章 · 第一个回测](/book/part2/ch8) |
| 回测报告上的指标 | [第 9 章 · 回测报告人话指南](/book/part2/ch9) |
| 怀疑代码有未来函数 | [第 10 章 · 新手八大坑](/book/part2/ch10) + [第 20 章 · AI 验货指南](/book/part3/ch20) |
| 想让 AI 帮你写聚宽代码 | [第 19 章](/book/part3/ch19) + [第 22 章 · 提示词模板库](/book/part4/ch22) |

::: info 📋 本页自查清单
- [ ] 我注册了聚宽并分清了研究环境 / 回测环境
- [ ] 我跑通了双均线回测，并能逐行讲出 `initialize` 里每一行的作用
- [ ] 我能说出 `attribute_history` 为什么"没有未来"
- [ ] 我检查过自己的代码里 `get_price` 的 `end_date` 用法
:::

→ 下一页：[P2 · QMT/miniQMT 上手](/platforms/qmt)（等你需要本地环境时再读）
