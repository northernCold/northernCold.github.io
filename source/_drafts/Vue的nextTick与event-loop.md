---
title: Vue的异步更新队列与nextTick
tags:
---

异步更新队列:

  1. 侦听到数据发送变化
  2. Vue开启一个队列，并缓存在同一事件循环中发生的所有数据变更
  3. 如果同一个 watcher 被多次触发，只会被推入到队列中一次。(这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的)
  4. 在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。

nextTick:

  > 官方描述：将回调推迟到下一个 DOM 更新周期之后执行。在更改了一些数据以等待 DOM 更新后立即使用它
  > 解读：
  > Vue开启一个队列缓存当前事件循环中所产生的所有数据变更，这些数据变更所触发的更新将在下一个“tick（microtask/macrotask）”执行。如果需要访问更新后dom，那么需要在下下一个“tick”的回调中访问

  主要提供一个异步API，执行任务

  具体实现：



关于Vue的nextTick的问题：


Q: 哪么这里有一个问题，为什么数据变更的后更新操作**异步执行**的
A: 
  只要watcher执行了update方法，就会执行[nextTick(flushSchedulerQueue)](https://github.com/vuejs/vue/blob/dev/src/core/observer/scheduler.js#L164-L190)
  如果改为同步的话，会变成一个搜集watcher，就会执行watcher更新。这样回造成，如果有多个watcher更新，可能会触发多次渲染
  如果使用异步执行的话，flushSchedulerQueue会等待所有的要执行更新的依赖收集完后，再更新这些依赖。只会渲染一下



Q: 使用nextTick的目的是什么
A: 提供一个异步的API，用来在当前的同步代码执行完毕后，执行需要执行的异步回调



## REFERENCE

- https://github.com/Ma63d/vue-analysis/issues/6

- https://zhuanlan.zhihu.com/p/142742003

- https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97

- https://juejin.cn/post/6844903591052836878