<template>
  <button>
    <span v-if="$slots.default" :class="shouldAddSpace ? 'expand' : ''">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useSlots, computed, Text } from "vue";

const slots = useSlots();

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

defineOptions({
  name: "FunButton",
});
</script>

<style src="./style.scss" scoped></style>
