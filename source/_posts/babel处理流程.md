---
title: babel处理流程
tags:
- babel
- ast
---

## what is babel

Babel是一个JavaScript的编译器，能够将ECMAScript 2015+ 语法编写成向后兼容的代码。

## how it works

![process](/assets/images/process.png)

1. 解析（source code转化AST阶段）
   1. 词法分析 将源代码分割成*Token*数组
   2. 语法分析 *Token*数组转换成AST
2. 转换（调整AST阶段）
   1. 遍历AST并应用*转换器*
   2. AST*转换器*，增删改查AST节点
3. 生成（AST生成source code阶段）

## Reference

1. [*深入浅出 Babel 上篇：架构和原理 + 实战](https://bobi.ink/2019/10/01/babel/)