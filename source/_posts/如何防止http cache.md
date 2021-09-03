---
title: 如何防止浏览器缓存
tags:
- 缓存
- 浏览器
---

> 以下内容是在了解`浏览器缓存机制`的前提下展开说明

线上部署项目后，经常会遇到各种各样的问题。其中一些跟浏览器缓存相关，明明文件更新了而浏览器却还是加载的不是预期文件，清除缓存后才能正常。答案很明显，导致这种情况是因为浏览器缓存。
服务器上文件更新后，浏览器还是访问缓存的内容。这种情况的缓存显然不是我们想要，那改如何避免呢？

防止浏览器错误的缓存需要关注三个方面的内容：
  1. 强制缓存
  2. 协商缓存
  3. 浏览器的`memory cache`和`disk cache`

浏览器访问时，只要命中以上其中一点，就会触发缓存。

|      |   命中规则   |   缓存失效的方法(只要达成一条就失效)   |
| ---- | ---- | ---- |
|   强制缓存   |   缓存字段是否过期   |   1.强制缓存相关的字段设置为始终过期；2.文件名发生变化；3.参数发生变化   |
|   协商缓存   |   文件是否更新   |   协商缓存相关的字段设置文件已经更新；   |
|   `memory cache`和`disk cache`   |   浏览器内是否存在该资源   |   1.文件名发生变化；2.参数发生变化   |

由上表可得，在设置了强制缓存、协商缓存后，只要**修改文件名称**或**添加变化的参数**。就能达到最终效果。

修改文件名称：一般是做法是 文件名 + hash(无论是与内容无关的hash，还是根据内容生成的hash) 结合
添加变化的参数：使用时间戳

**这样做的目的是**: 避免资源文件更新后，由于`disk cache`或者`memory cache`存在，导致加载资源还是旧的资源。

> `memory cache`可以通过关闭浏览器，重新打开可以解决。 `disk cache`则需要强制清除缓存才能处理。这些操作不可能由用户来处理，体验会非常差，所以要避免这种情况发生。

|   文件内容变化的频率   |   文件名称采用的策略   |   文件类型   |
| ---- | ---- | ---- |
|   经常   |   hash   |   包含业务代码、图片等资源的文件   |
|   不经常   |   hash/版本号   |   第三方依赖、全局模块   |
|   不会发生变化   |   -   |   第三方依赖（很少）   |

当然这个对于经常内容发送改变的文件采用这样的文件名加`hash`，只有不变动的文件才不加`hash`。如果使用vue、react这些不经常变动的第三方框架，文件名至少也要加个版本号之类的字符。如果什么都不加的话，如果项目使用了第三方框架的新的功能，升级了第三方框架的版本。而且文件名只是框架名称，在浏览器存在`memory cache`或者`disk cache`的情况下，由于加载的是旧版本的内容，没有包含框架新的功能，如果使用了框架的新功能，则页面会发生报错。

[A Tale of Four Caches](https://calendar.perfplanet.com/2016/a-tale-of-four-caches/)
[网易云课堂 Service Worker 运用与实践](https://mp.weixin.qq.com/s/3Ep5pJULvP7WHJvVJNDV-g)
[一文读懂前端缓存](https://zhuanlan.zhihu.com/p/44789005)
[HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)
[Prevent unnecessary network requests with the HTTP Cache](https://web.dev/http-cache/)
[HTTP Caching](https://developers.google.com/web/fundamentals/performance/get-started/httpcaching-6#enabling_caching)
[Service Worker: 简介](https://developers.google.com/web/fundamentals/primers/service-workers?hl=zh-cn#%E4%BB%80%E4%B9%88%E6%98%AF_service_worker)