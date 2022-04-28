<script setup lang="ts">
import Button from "../packages/components/Button/Button.vue";

import { throttle } from "../packages/directives/index";

const clickHandle = (e: Event) => {
  console.log(111, e);
};

defineOptions({
  directives: { throttle },
});


</script>

<template>
  <h3>按钮组件</h3>
  <div>
    <Button v-throttle.300="(e: Event) => clickHandle(e)" >中文</Button>
    <Button type="secondary">中文1</Button>
    <Button type="danger">新增同步操作</Button>
    <Button type="warning">新增同步操作</Button>
  </div>
  <h3>测试</h3>
  <div>
    <Button>中文</Button>
    <Button>中文1</Button>
    <Button>新增同步操作</Button>
  </div>
</template>

<style></style>
