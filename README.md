---
title: tailwindcss 究竟比 unocss 快多少？
zhihu-title-image: https://pic4.zhimg.com/80/v2-e967ccea27e66471685a27c2812b6ab4.jpg
zhihu-url: https://zhuanlan.zhihu.com/p/685445883
---

# tailwindcss 究竟比 unocss 快多少？

## 前言

大家好，我是 [unocss 究竟比 tailwindcss 快多少？](./README_2024.md) 的作者 [`icebreaker`](https://github.com/sonofmagic)

转眼今年已经到了 `2025` 年了，`tailwindcss@4` 也已经发布，进行了大量的功能和性能升级之外，本身的定位也转变为了一个样式预处理器。现在最新版本为 `4.1.13`

而 `unocss` 也一直在发布版本，现在最新版本为 `66.5.1`，现在写法也已经部分兼容了 `tailwindcss@4`，但是无法像 `tailwindcss@4` 那样，直接把配置写在 `css` 里。

## 开始测试

这里我基于去年的基准测试用例，添加了 `tailwindcss@4` 的测试用例。

> 测试素材以及代码 `fork` 自 `unocss` 官方 `bench`，和官方 `bench` 不同的是，我为了同时为了模拟平常的开发场景，我还加入了等量的 `@apply` 指令，这样它们都免不了要去解析 `CSS` 抽象语法树。属于是给 `2` 者增加负重了。

> 测试设备都为 `Mac Book M1 (2021)`, 跑 `200` 次，取 `75%`

[源代码链接](https://github.com/sonofmagic/tailwindcss-vs-unocss/tree/main/bench)

运行后，测试结果如下所示：

```
2025/9/10 15:14:54
1656 utilities | x200 runs (75% build time)

none                             13.65 ms / delta.      0.00 ms
tailwindcss4-vite v4.1.13        115.62 ms / delta.    101.97 ms (x1.00)
tailwindcss4-postcss v4.1.13     251.09 ms / delta.    237.44 ms (x2.33)
unocss-vite  v66.5.1             329.38 ms / delta.    315.73 ms (x3.10)
tailwindcss3 v3.4.17             702.46 ms / delta.    688.81 ms (x6.76)
unocss-postcss v66.5.1           872.79 ms / delta.    859.14 ms (x8.43)
```

## 那么我们应该选择那个么

又是经过 1 年的使用
