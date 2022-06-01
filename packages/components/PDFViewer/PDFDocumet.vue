<template>
    <div class="pdf-docuemt" ref="wrapperRef">
        <slot v-if="pdfLoaded"></slot>
    </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref, } from 'vue';
import { PDFLoader } from './pdf'
defineOptions({
    name: "PSDDocumet"
})
interface PropsInterface {
    url: string
}
interface EmitsInterface {
    (name: 'loaded', value: number): void
}
const props = defineProps<PropsInterface>()
const emits = defineEmits<EmitsInterface>()

const pdfLoader = new PDFLoader()
const pdfLoaded = ref<boolean>(false)
const wrapperRef = ref<HTMLDivElement>()

provide('pdfLoader', pdfLoader)


onMounted(async () => {
    await pdfLoader.loadDocument(props.url, wrapperRef.value as HTMLDivElement)
    pdfLoaded.value = true
    emits('loaded', pdfLoader.pdfDOC?.numPages as number)
})




</script>

