<template>
    <div class="pdf-page">
        <canvas ref="canvasRef"></canvas>
    </div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, watch } from 'vue';
import { PDFLoader } from './pdf';
defineOptions({
    name: "PdfPage",
})
interface PropsInterface {
    page: number
}
const props = withDefaults(defineProps<PropsInterface>(), {
    page: 1
})

const canvasRef = ref<HTMLCanvasElement>()
const pdfLoader = inject('pdfLoader') as PDFLoader
const collectRender = inject('collectRender') as Function
const clearRender = inject('clearRender') as Function


const render = () => {
    pdfLoader.loadPage(props.page, canvasRef.value as HTMLCanvasElement)

}

onMounted(() => {
    render()
    collectRender(render)
})
onUnmounted(() => {
    clearRender(render)
})
watch(() => props.page, () => {
    pdfLoader.loadPage(props.page, canvasRef.value as HTMLCanvasElement)
})



</script>

