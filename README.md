---
title: tailwindcss 究竟比 unocss 快多少？
zhihu-title-image: https://pic4.zhimg.com/80/v2-e967ccea27e66471685a27c2812b6ab4.jpg
zhihu-url: https://zhuanlan.zhihu.com/p/685445883
---

# tailwindcss 究竟比 unocss 快多少？

## 前言

大家好，我是去年一篇测评 [《unocss 究竟比 tailwindcss 快多少？》](./README_2024.md) 的作者 [`icebreaker`](https://github.com/sonofmagic)。

一晃到了 **2025 年**，`tailwindcss@4` 也正式发布了，现在最新版本是 `4.1.13`。

新版本不仅在功能和性能上大升级，甚至定位也发生了变化: 从一个 `PostCSS` 插件变成了**样式预处理器**。

与此同时，`unocss` 也一直在进步，一路也更新到了 `66.5.1`，新的 `preset-wind4` 写法上也对 `tailwindcss@4` 做了一定的兼容。

但有一点还是不一样：它还没办法像 `tailwindcss@4` 一样，把所有配置都直接写在 `css` 里。

## 开始测试

这次测试，我还是沿用了去年的基准用例，不过加了更多场景。

比如，我在里面加入了等量的 `@apply` 指令，来模拟真实开发时的情况。这样一来，不管是 `tailwindcss` 还是 `unocss`，都得老老实实去解析 `CSS AST`，算是“加点负重”。

测试环境保持一致，依旧还是我的老伙计 **MacBook M1 Pro (2021)**（想换新的 M4 Pro了）

跑 `200` 次，提取并生成 `1656` 个工具类，取 `75%` 分位数（避免极端值干扰）。

测试代码大家也可以自己跑跑 👉 [源代码](https://github.com/sonofmagic/tailwindcss-vs-unocss/tree/main/bench)。

## 测试报告

测试结果如下：

```
2025/9/11 10:01:53
1656 utilities | x200 runs (75% build time)

none                                         14.42 ms / delta.      0.00 ms
@tailwindcss/vite        v4.1.13            268.90 ms / delta.    254.48 ms (x1.00)
unocss/vite              v66.5.1            362.08 ms / delta.    347.66 ms (x1.37)
@tailwindcss/postcss     v4.1.13            438.63 ms / delta.    424.21 ms (x1.67)
tailwindcss3             v3.4.17            739.27 ms / delta.    724.85 ms (x2.85)
@unocss/postcss          v66.5.1            912.33 ms / delta.    897.91 ms (x3.53)
```

## 分析结果

从数据里可以很直观地看出几个结论：

- **最快的是 `tailwindcss@vite`**，平均 **268ms**。
- **最慢的是 `@unocss/postcss`**，接近 **912ms**。
- **`@tailwindcss/vite` vs `unocss/vite`**：
  - `unocss/vite`（362ms）对比 `tailwindcss@vite`（268ms），大概 **慢 1.37 倍**。
- **postcss 模式的开销真的很大**：
  - `tailwindcss@postcss` 比 `vite` 版本慢将近一倍（438ms）。
  - `@unocss/postcss` 更是接近 `vite` 版 `tailwindcss@4` 的 **4倍**。
- **老的 tailwindcss@3**（`739ms`）基本没法和新版本比，性能差距太明显。

因为这个结果，所以这篇文章起了这个标题 `tailwindcss 究竟比 unocss 快多少？`，正好和去年的反过来了。

## 为什么会这样？

个人总结了一些原因：

1. **tailwindcss@4 的技术升级**
   - 它的 `Token` 提取器用 `Rust` 重写，效率高很多。(可能这点加了大分)
   - 定位从 `PostCSS` 插件转为“预处理器”，内部对 `AST` 解析和构建做了深度优化。
   - 在 `Vite` 集成模式下，性能直接拉满。

2. **unocss 的灵活性代价**
   - `unocss` 胜在灵活和可扩展，但灵活带来额外性能开销。
   - 特别是 runtime 动态生成规则、插件抽象这些地方，都会拖慢速度。
   - 在 `PostCSS` 模式下表现更差。

3. **vite 的加成**
   - `vite` 本身 HMR 和插件体系就很快。
   - `tailwindcss@vite` 能直接吃到 `vite` 的缓存和优化红利。

## 我们应该选用哪个方案?

### 从生态的角度考虑

从生态上来说，**`tailwindcss` 基本上是“既成事实的标准”**。

无论是前端社区里大大小小的 UI 组件库，还是各种脚手架、模版项目，AI 生成的代码，大多数都优先支持 tailwindcss。

比如：

- **UI 组件库**：像 `shadcn/ui`、`daisyUI`、`flowbite` 等，几乎全是基于 `tailwindcss` 打造。
- **框架模版**：`Next.js`、`Nuxt`、`Remix`、`Astro` 的官方或社区 `starter` 里，大多数开箱即配好 `tailwindcss`。
- **文档和教程**：`tailwindcss` 的学习资料、视频课程、最佳实践文章，数量远超 `unocss`。

换句话说，如果你用 `tailwindcss`，几乎可以无缝接入整个生态，不用自己花太多心思去适配。

所以，如果你项目需要稳定的生态支持、丰富的组件库，**首选 tailwindcss 基本没悬念**。

### 从自定义和灵活性的角度考虑

但如果你追求的是**极致的灵活性**，那 `unocss` 依旧是很强的选项。

unocss 的特点是：

1. **规则引擎化**：你可以像写正则一样，自定义规则来生成工具类。
2. **预设体系**：除了官方的 `@unocss/preset-uno`，还能叠加 `attributify`、`icons`、`typography` 等预设，甚至自己写预设。
3. **任意属性模式**：不仅仅是类名，甚至可以用类似 `text="red-500"` 这样的写法。

这类灵活性，在 `tailwindcss` 里要么需要写 `plugin`，要么使用内联样式。而在 `unocss` 里就是一条正则规则的事情。

而且 `unocss` 能够使用 **Attributify 模式**：

```html
<!-- unocss 支持直接在属性里写 -->
<div flex="~ col" text="center gray-700" m="y-4">
  <p>Hello World</p>
</div>
```

这种写法比 `tailwindcss` 的“长串 `class`”要简洁很多，特别适合喜欢 HTML 语义化的人。

不过 `unocss` 的灵活性，导致 `unocss-merge` 相对难产, https://www.npmjs.com/package/unocss-merge 这个包没人用，个位数下载量。

不像 `tailwind-merge` 已经成为各个 `tailwindcss` 组件库的标配了。(Weekly Downloads 将近1千200万次)

所以结论是：

- **tailwindcss** = 生态第一，几乎是“官方标配”。
- **unocss** = 灵活度第一，适合“想自己捏规则”的场景。

## 结语

今天的数据用一句话总结：

- `tailwindcss` 的性能全面超越 `unocss`

所以，如果你追求**开发体验 + 构建速度**，那现在毫无疑问是 **tailwindcss@4 + vite** 最优解。

最后，也再期待一波 `unocss` 的大更新，再和 `tailwindcss` 它们之间相互卷起来，未来给我们开发者带来更多的惊喜！
