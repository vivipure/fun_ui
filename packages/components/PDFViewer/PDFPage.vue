<template>
    <div class="pdf-page">
        <canvas ref="canvasRef"></canvas>
    </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { PDFLoader } from './pdf';
defineOptions({
    name: "PSDPage",
})
interface PropsInterface {
    page: number
}
const props = withDefaults(defineProps<PropsInterface>(), {
    page: 1
})

const canvasRef = ref<HTMLCanvasElement>()
const pdfLoader = inject('pdfLoader') as PDFLoader

onMounted(() => {
    pdfLoader.loadPage(props.page, canvasRef.value as HTMLCanvasElement)
})



</script>

