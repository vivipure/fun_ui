<script setup lang="ts">
import { ref } from 'vue';
import { PDFDocument, PDFPage } from '../packages/components/PDFViewer/index'
const psdUrl = `https://inficloud.ideamake.cn/data_inficloud/upload_file_prod/v6sbr_beijingaerle.pdf`
const psdPageNums = ref<Number>(0)

const pdfLoad = (page: number) => {
  psdPageNums.value = page
}
</script>

<template>
  <PDFDocument :url="psdUrl" @loaded="pdfLoad">
    <PDFPage v-for="n in psdPageNums" :key="n" :page="(n as unknown as number)"></PDFPage>
  </PDFDocument>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
