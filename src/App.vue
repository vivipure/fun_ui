<script  lang="ts">
import debounce from '../packages/directives/debounce/index'

export default {
  directives: {
    debounce
  },
  data() {
    return {
      a: 1
    }
  },
  methods: {
    haha() {
      console.log(111)
    }
  },
}


</script>

<template>
  <div class="pdf-container">
    <button :type="a" v-debounce="() => haha()">test empty</button>
    <button :type="a" v-debounce.immediate="() => haha()">test immediate</button>
    <button :type="a" v-debounce.1000="() => haha()">test times</button>
    <button :type="a" v-debounce:mouseover="() => haha()">test times</button>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.pdf-container {
  width: 50%;
}
</style>
