<template>
    <div class="pdf-docuemt" ref="wrapperRef">
        <slot v-if="pdfLoaded"></slot>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref, } from 'vue';
import { PDFLoader } from './pdf'
import elementResizeDetectorMaker from 'element-resize-detector'
import { debounce } from '../../utils/help';

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



const pages: Function[] = []

provide('pdfLoader', pdfLoader)
provide('collectRender', (render: Function) => {
    pages.push(render)
})
provide('clearRender', (render: Function) => {
    pages.splice(pages.indexOf(render), 1)
})


const updateChildrenPage = debounce(() => {
    pdfLoader.updateWrapper(wrapperRef.value)
    console.log('change')
    pages.forEach(render => render())
}, 300, false)


onMounted(async () => {
    await pdfLoader.loadDocument(props.url, wrapperRef.value as HTMLDivElement)
    pdfLoaded.value = true
    emits('loaded', pdfLoader.pdfDOC?.numPages as number)
    let wrapperWidth = wrapperRef.value?.clientWidth
    elementResizeDetectorMaker().listenTo(wrapperRef.value as HTMLDivElement, function (element: any) {
        if(element.clientWidth != wrapperWidth) {
            wrapperWidth = element.clientWidth
            updateChildrenPage()
        }
    });
})

onUnmounted(() => {
    pdfLoader.destory()
})



</script>

