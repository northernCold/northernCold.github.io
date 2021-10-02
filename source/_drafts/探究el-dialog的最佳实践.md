---
title: 探究el-dialog的最佳实践
tags:
---

> 前言：相信用过[element-ui](https://github.com/ElemeFE/element)组件的同学，应该都使用过`el-dialog`这个组件。我在使用`el-dialog`的过程中，遇到了不同的问题，探究`el-dialog`的最佳实践，变换了不同的写法。

## 原始写法

刚开始是将弹窗的代码与页面代码写在一起。
例如：用户列表页面

```html
<template>
  <div>
    <!-- 用户列表页面的代码 -->
  </div>
  <el-dialog>
    <!-- 新增用户弹窗的代码 -->
  </el-dialog>
</template>
```

## 抽成组件

后来发现弹窗和页面的代码不应该耦合会更好

```html
<template>
  <div>
  <!-- 用户列表页面的代码 -->
  </div>
  <!-- 新增用户弹窗的封装后的组件 -->
  <add-user-dialog>
</template>

<!-- add-user-dialog.vue -->
<template>
  <el-dialog>
    <!-- ... -->
  </el-dialog>
</template>
```

但是这样造成一个问题，弹窗封装后的组件的生命周期触发的时机不是预期的。

1. 进入用户列表页面，`add-user-dialog`就已经开始加载了。
2. 弹窗关闭后，并不会销毁`add-user-dialog`，意味着下次打开的弹窗状态就是上次关闭时的状态，需要手动清除。

## 使用destroy-on-close

```html
<template>
  <div>
  <!-- 用户列表页面的代码 -->
  </div>
  <!-- 新增用户弹窗的封装后的组件 -->
  <add-user-dialog>
</template>

<!-- add-user-dialog.vue -->
<template>
  <el-dialog
    destroy-on-close>
    <!-- ... -->
  </el-dialog>
</template>
```

他的实现是利用vue的key的性质，通过变换key的值，强行重新渲染弹窗里的节点。会有一些问题

1. 组件内的生命周期触发时机不正确

```html
<div class="dialog-box">
  <el-dialog
      title="dialogB"
      destroy-on-close
      :visible.sync="showAddRecord"
      width="40%">
    <test></test> // 传入一个组件
  </el-dialog>
</div>
```
你点击关闭的时候，这个时候key发生改变，重新渲染了你封装的组件（销毁当前组件，重新加载新渲染的组件)

2.如果你没有使用组件的话 destory-on-close是无效的

```html
<div class="dialog-box">
  <el-dialog
      title="dialogA"
      destroy-on-close
      :visible.sync="showAddRecord"
      width="40%">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
  </div>
```

## 使用v-if

```html
<template>
  <div>
    <user-modal v-if="visible" v-model="visible"></user-modal>
    <el-button @click="handleClick">click</el-button>
  </div>
</template>
<script>
import UserModal from "../user-modal";

export default {
  components: {
    UserModal
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    handleClick() {
      this.visible = true;
    },
  }
}
</script>

<template>
  <el-dialog
    :visible.sync="visible">
    <el-input v-model="value1"></el-input>
  </el-dialog>
</template>
<script>

export default {
  props: {
    value: Boolean,
  },
  watch: {
    visible(val) {
      this.$emit("input", val);
    }
  },
  mounted() {
    this.visible = this.value;
    console.log("111111111")
  },
  data() {
    return {
      visible: false,
      value1: ""
    }
  },
}
</script>
```

## REFERENCE

- https://github.com/ElemeFE/element/issues/18957

- https://www.jianshu.com/p/77d1ba476a6d
