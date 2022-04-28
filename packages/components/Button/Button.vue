<template>
  <button :class="buttonClass" @click="clickHandle">
    <span v-if="$slots.default" :class="shouldAddSpace ? 'expand' : ''">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useSlots, computed, Text } from "vue";

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

const slots = useSlots();

const buttonClass = computed<string[]>(() => {
  const typeClassName = `fun-btn-${props.type}`;

  return [typeClassName];
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

defineOptions({
  name: "FunButton",
});
</script>

<style src="./style.scss" scoped></style>
