---
title: axios解析
date: 2021/6/20 14:27:15
tags: 
- 框架原理
---

## axios拦截器原理

axios的拦截器，是由两个数组维护的，都是Promise对象，其中一个数组按顺序用来存储 request的拦截器的Promise、触发请求的Promise。另一个数组按顺序存储response的拦截器的Promise。最终利用Promise的链式调用的特性，生成一个Promise。因此执行一次axios请求，都会按顺序执行request的拦截器的Promise、 触发请求的Promise、response的拦截器的Promise。

## axios取消请求
```javascript
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// cancel the request
cancel();
```

有两个Promise，准确的说一个是Promise链(包含拦截器的请求Promise链)，[另一个](https://github.com/axios/axios/blob/7821ed20892f478ca6aea929559bd02ffcc8b063/lib/adapters/xhr.js#L170)Promise, 将通过新建CancelToken实例时，接受该Promise的[resolve方法](https://github.com/axios/axios/blob/master/lib/cancel/CancelToken.js#L17)。执行该方法后，内部会执行`request.abort`方法，实现请求的Promise的状态从**pending**变为**rejected**状态，[捕获异常](https://github.com/axios/axios/blob/master/lib/core/dispatchRequest.js#L67)


## Reference

1. [axios](https://github.com/axios/axios/blob/master/lib/core/Axios.js)

