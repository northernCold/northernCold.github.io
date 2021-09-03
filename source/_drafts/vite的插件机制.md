---
title: vite的插件机制
tags:
---

1. [Rollup官网 - plugins](https://rollupjs.org/guide/en/#plugins-overview)

> vite插件扩展了设计出色的 Rollup 接口，带有一些 vite 独有的配置项。要了解vite的Plugin机制先了解rollup的。


If your plugin uses 'virtual modules' (e.g. for helper functions), prefix the module ID with \0. This prevents other plugins from trying to process it.

https://github.com/proteriax/rollup-plugin-ignore
https://github.com/rollup/rollup-plugin-commonjs/blob/master/src/index.js
https://github.com/rollup/rollup-pluginutils/issues/54

[vite插件](https://vitejs.cn/guide/api-plugin.html)

[如何实现一个 esbuild 插件？从入门到上手，没有比这更简单的了](https://zhuanlan.zhihu.com/p/362046068)

> 提及了Virtual Modules定义



2. 尝试利用vite的plugin，实现element-ui的markdown生成demo的方案

[vite-plugin-md]https://github.com/antfu/vite-plugin-md/blob/main/src/markdown.ts