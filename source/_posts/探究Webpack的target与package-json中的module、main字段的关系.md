---
title: 探究Webpack的target与package.json中的module、main字段的关系
date: 2021-09-03 17:29:27
tags:
---


本文主要探究

1. Webpack的[target](https://webpack.docschina.org/configuration/target/)与packcage.json中module、main字段的关系。

2. 项目中引入第三方库的机制

## 前言

在Vue2.x项目中引入[vue-loaders](https://github.com/Hokid/vue-loaders/issues?q=is%3Aissue+is%3Aclosed)库后，发现部署环境在低版本浏览器中（如IE11）报错。排查后发现vue-loaders引入的文件包含ES6语法的代码。

继续排查，vue-loaders提供了`umd`、`esm`的两种版本文件：

```javascript
{
  "main": "dist/vue-loaders.umd.js",
  "module": "dist/vue-loaders.esm.js",
}
```

导入的是包含es6代码`dist/vue-loaders.esm.js`文件。

那么问题来了，为什么导入的是module对应的文件，而不是main对应的文件？

## Webpack中的Target

官网中对[Target](https://webpack.docschina.org/configuration/target/)详细的解释。

简单的总结：

- target的作用是设定一个环境编译项目。（如果项目引入第三方库，并且该库有多个入口。选择哪一个入口target值是影响因素之一）

- 项目中如果存在[browserslist的配置](https://github.com/browserslist/browserslist#config-file)，webpack的target默认值为`browserslist`。否则默认值为`web`。

- target为`browserslist`的时候，根据browserslist的配置来推断环境。

> 补充说明：target值为browserslist的时候，及时配置都是浏览器范围，及时包含低版本的浏览器，也不会影响package.json中的`main`与`module`的优先级


## 项目中引入第三方库的机制

使用webpack为构建工具的项目，引入第三方库的时候。

1. 确定webpack的target的值
2. 然后在根据第三方库的package.json的入口字段(module、main)的优先级
3. webpack将优先级最高的字段对应的文件引入项目中


## 回答

1. 首先确定browserslist配置，是`web`环境

```
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 9"
],
```

2. vue-loaders的package.json文件有`main`、`module`字段
3. 根据[这篇文章](https://github.com/SunshowerC/blog/issues/8#webpack-node-esmcommonjs)和验证，判断在`web`环境下，module的优先级比mian高
4. 因此引入的是module对应的文件

解决办法有两点：

1. 直接引入`umd`格式的文件

2. 修改webpack配置，编译`esm`格式的文件

```javascript
// vue.config.js
module.exports = {
  transpileDependencies: [
    'vue-loaders'
  ]
}
```

webpack
要修改babel-loader配置include的
```javascript
//webpack.config.js
{
    test: /\.m?jsx?$/,
    include: [
        path.resolve(__dirname, 'src'),
        /vue-loaders/,
    ],
    use: [
    {
      loader: 'babel-loader'
    }
  ]
}
```

## REFERENCE

1. [package.json 中 你还不清楚的 browser，module，main 字段优先级](https://github.com/SunshowerC/blog/issues/8#webpack-node-esmcommonjs)

2. [webpack target的用法](https://webpack.docschina.org/concepts/targets/#usage)

3. [构建目标(Targets)](https://webpack.docschina.org/configuration/target/)
