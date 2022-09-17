<script lang="ts" setup>
import { ref } from "vue";

import TransitionExpand from "../packages/components/TransitionExpand/Index.vue";
const visible = ref(false);

const toggleVisible = () => (visible.value = !visible.value);
</script>

<template>
  <div>
    <button @click="toggleVisible">切换</button>

    <TransitionExpand height="700px">
      <div v-if="visible" class="contaienr" >1111</div>
    </TransitionExpand>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.contaienr {
  background: #000;
}
</style>
