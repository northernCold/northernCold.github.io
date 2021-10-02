---
title: 初步认识vite
tags:
---

vite 是什么
https://zhuanlan.zhihu.com/p/351147547

vite是一个开发服务器和打包功能组合的前端构建工具。

开发服务器：利用浏览器ES模块支持

打包功能：使用Rollup打包

vite 有啥特点

1.按需编译
2.预构建
3.基于 Rollup 插件 API 的设计 很多 Rollup 插件可以跟 Vite 直接兼容
4.模块热重载

> 更快的依赖预构建
> 
> Vite 使用 esbuild 而不是 Rollup 来进行依赖预构建。这为开发服务器冷启动和依赖项失活的重新构建方面带来了显著的性能改进。


为何不用 ESBuild 打包？
https://cn.vitejs.dev/guide/why.html#why-not-bundle-with-esbuild

vite 如何分辨哪些是需要预构建

https://juejin.cn/post/6930407545374785543


vite如何通过拦截import的http请求，来实现无需打包

https://zhuanlan.zhihu.com/p/149033579

