<script setup lang="ts">
import { ref } from 'vue';
import { PDFDocument, PDFPage } from '../packages/components/PDFViewer/index'
const psdUrl = `./demo.pdf`
const psdPageNums = ref<Number>(0)

const pdfLoad = (page: number) => {
  psdPageNums.value = page
}
</script>

<template>
  <div class="pdf-container">
    <PDFDocument :url="psdUrl" @loaded="pdfLoad">
      <PDFPage v-for="n in psdPageNums" :key="n" :page="(n as unknown as number)"></PDFPage>
    </PDFDocument>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.pdf-container {
  width: 20%;
}
</style>
