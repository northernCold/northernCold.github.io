---
title: 什么是JSONP
date: 2021-08-09 18:18:43
tags:
---


> 根据Wiki对[JSONP](https://en.wikipedia.org/wiki/JSONP)的定义：通过加载script标签来请求数据的JavaScript技术。这样做的能够是绕过浏览器同源策略的限制。

假设你在`example.com`域名下，想要向`example.net`域名发送请求。要实现这个想法，首先需要解决**浏览器跨域**。

众多跨域方法中，其中一种就是**JSONP**，利用script标签没有跨域的限制，来达解决跨域效果。

通过script标签到达XHR类似的效果

```javascript
script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://example.com/some-data';
```

数据加载成功后，得到

```html
<script>
['some string 1', 'some data', 'whatever data']
</script>
```

但是这样做的有些小问题，在script标签中无法使用该数据。`JSONP`的做法是：

```javascript
script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://example.com/some-data?callback=myCallback';
```

然后服务器应该这么处理：

```javascript
const http = require("http");
const querystring = require("querystring");

http.createServer(function (req, res) {
  const params = querystring.parse(req.url.split("?")[1]);
  console.log(params)
  res.writeHead(200, {
    "Content-Type": "application/json;charset=UTF-8"
  });
  // 在页面打印
  res.write(`${params.callback}(['some string 1', 'some data', 'whatever data'])`)

  // 结束响应
  res.end();
}).listen(3000)
```

返回格式：\[`callback`的参数值\](数据)，加载完后携带数据执行myCallback函数，我们只需要声明myCallback的函数，就能得到数据。

```html
<script>
myCallback(['some string 1', 'some data', 'whatever data']);
</script>
```

## 缺点

JSONP实际上是一种跨域的hack，有一些缺点：

- 只支持get方法
- 因为它是由一个简单的脚本标记触发的GET请求，所以我们不会得到有用的错误或进度信息


## REFERENCE

- [JSONP](https://en.wikipedia.org/wiki/JSONP)
- [What is JSONP, and why was it created?](https://stackoverflow.com/a/2067584/14806308)