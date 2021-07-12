---
title: '@babel/polyfill与@babel/runtime'
date: 2021/6/14 11:41:04
tags: 
- babel
---

## 区别

> babel默认转换js语法，而不会转换*新的API*以及一些*定义在全局对象上的方法*。这部分是由`@babel/polyfill`或者`@babel/runtime`二者选一完成。


|                 | 用法                                                         | 缺点                                                         | 优点                                          |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------- |
| @babel/polyfill | 在所有代码之前，引入polyfill；或者在webpack配置中作为第一个entry | 1.由于是整体使用，体积大，可能引入不需要的内容； 2.会污染全局变量 |                     简单，一方便                          |
| @babel/runtime  | 配合`babel-plugin-transfer-runtime`使用，并在babel配置里色泽plugin | 因为不是在原理链上添加方法，所有不支持实例方法`"foobar".includes("foo")`。(core-js@3已经可以支持实例方法) | 1.按需加载 2.使用变量的方式，所有不会污染全局 |

## REFERENCE

1. [一口（很长的）气了解 babel](https://zhuanlan.zhihu.com/p/43249121)

2. [babel-plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)