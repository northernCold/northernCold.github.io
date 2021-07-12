---
title: tree-shaking与副作用
data: 2021/7/11
tags:
- webpack
- tree-shaking
- 副作用
---

## 什么是副作用

定义：**一个函数内如果修改了除本地环境之外的一些状态变量，则说明该函数有副作用。**

## tree-shaking失效的原因

tree-shaking失效的原因：1.使用的不是ES moduels 2.代码中存在副作用。

但是使用了ES moduel以及代码中没有副作用为什么还是失效呢？

原因是：项目中使用了`babel`，代码编译后产生了副作用。

## 如何解决

需要在`package.json`设置`sideEffect`属性,[Webpack 中的 sideEffects 到底该怎么用？](https://github.com/kuitos/kuitos.github.io/issues/4), 

## REFERENCE

1. [Side effect (computer science)](https://en.wikipedia.org/wiki/Side_effect_(computer_science))
 
2. [你的Tree-Shaking并没什么卵用](https://juejin.cn/post/6844903549290151949#heading-0)

3. [Webpack 中的 sideEffects 到底该怎么用？](https://github.com/kuitos/kuitos.github.io/issues/41)
> 这篇从实践的角度描述了webpack的tree-shaking的原理
