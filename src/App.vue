<script setup lang="ts">
import { ref } from 'vue';
import { PDFDocument, PDFPage } from '../packages/components/PDFViewer/index'
const psdUrl = `https://inficloud.ideamake.cn/data_inficloud/upload_file_prod/v6sbr_beijingaerle.pdf`
const psdPageNums = ref<Number>(0)

const pdfLoad = (page: number) => {
  console.log('加载完成了', page)
  psdPageNums.value = page
}
</script>

<template>
  <PDFDocument :url="psdUrl" @loaded="pdfLoad">
    <PDFPage v-for="(n) in psdPageNums" :key="n" :page="n"></PDFPage>
  </PDFDocument>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
