<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { watch, ref } from "vue";

defineOptions({
  name: "FunInput",
});

interface EmitInterface {
  (name: "change" | "input" | "update:modelValue", value: string): void;
}

interface PropsInterface {
  modelValue: string;
  size?: "middle" | "small";
  width?: string;
  disabled?: boolean;
}

const props = defineProps<PropsInterface>();
const emit = defineEmits<EmitInterface>();

const inputValue = ref<string>(props.modelValue);

watch(props, (props) => {
  inputValue.value = props.modelValue;
});

watch(inputValue, (curValue) => {
  if (curValue != props.modelValue) emit("update:modelValue", curValue);
});

const changeHandle = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit("change", value);
};

const inputHandle = (e: Event) => {
  emit("input", (e.target as HTMLInputElement).value);
};

const inputStyle = computed(() => {
  const style: any = {};
  if (props.width) {
    style.width = props.width;
  }
  return style;
});
</script>
<template>
  <div class="fun-input">
    <input
      v-model="inputValue"
      type="text"
      :style="inputStyle"
      @change="changeHandle"
      @input="inputHandle"
    />
  </div>
</template>

<style scoped lang="scss">
input {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #d2d2d2;
  color: #515151;
  height: 32px;
  line-height: 40px;
  padding: 0 15px;
  width: 100%;
}
</style>
