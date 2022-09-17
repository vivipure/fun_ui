<template>
  <transition
    name="expand"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ height: string }>(), {
  height: "auto",
});

const enter = (element: HTMLElement) => {
  const realHeight = getComputedStyle(element).height;
  element.style.height = "0px";
  requestAnimationFrame(() => {
    element.style.height = props.height === "auto" ? realHeight : props.height;
  });
};
const afterEnter = (element: HTMLElement) => {
  element.style.height = props.height;
};

const leave = (element: HTMLElement) => {
  element.style.height = getComputedStyle(element).height;
  requestAnimationFrame(() => {
    element.style.height = "0px";
  });
};
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.5s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>
