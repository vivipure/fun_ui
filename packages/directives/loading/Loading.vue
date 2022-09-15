<template>
    <div class="fun-loading-mask">
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'FunLoading'
})
</script>

<style >
.fun-loading-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .35);
}
</style>