<script setup lang="ts">
import { ref } from "vue";
import Button from "../packages/components/Button/Button.vue";
import FunInput from "../packages/components/input/Input.vue";
import FunVideo from "../packages/components/Video/index.vue";

import { throttle } from "../packages/directives/index";

const inputValue = ref<string>("");


const clickHandle = (e: Event) => {
  console.log(111, e);
};

defineOptions({
  directives: { throttle },
});

const inputChange = (value: string) => {
  console.log(inputValue.value)
};
</script>

<template>
  <!-- <h3>按钮组件</h3>
  <div>
    <Button v-throttle.300="(e: Event) => clickHandle(e)">中文</Button>
    <Button type="secondary">中文1</Button>
    <Button type="danger">新增同步操作</Button>
    <Button type="warning">新增同步操作</Button>
  </div>
  <h3>输入框</h3>
  <div>
    <FunInput v-model="inputValue" @input="inputChange" />
    <FunInput width="40px" v-model="inputValue" @input="inputChange" />
  </div> -->
  <FunVideo></FunVideo>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
