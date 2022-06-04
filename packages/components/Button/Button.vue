<template>
  <button :class="buttonClass" @click="clickHandle">
    <span :class="shouldAddSpace ? 'expand' : ''">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { useSlots, computed, } from "vue";
defineOptions({
  name: "FunButton",
});

const slots = useSlots();

interface ButtonProps {
  type?: "primary" | "secondary" | "warning" | "danger";
  disabled?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "primary",
  disabled: false,
});

const emit = defineEmits<{
  (name: "click", event: Event): void;
}>();



const buttonClass = computed<string>(() => {
  const typeClassName = `fun-btn-${props.type} fun-button`;

  return typeClassName;
});

const shouldAddSpace = computed<boolean>(() => {
  const defaultSlot = slots.default?.();

  if (defaultSlot?.length === 1) {
    const slot = defaultSlot[0];
    if (slot.type === Text) {
      const text = slot.children as string;
      return /^\p{Unified_Ideograph}{2}$/u.test(text.trim());
    }
  }
  return false;
});

const clickHandle = (e: Event) => {
  if (props.disabled) return;
  emit("click", e);
};


</script>

<style src="./style.scss">
</style>
