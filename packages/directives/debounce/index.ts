import { DirectiveBinding, ObjectDirective } from "vue";
import { debounce } from "../../utils/help";

interface DebounceAttrs {
  immediate: boolean;
  debounceTime: number;
  debounceFunc(...args: any[]): any;
  debounceHandler(...args: any[]): any;
  debounceEventName: string;
}

function getParamsFromBind(
  el: HTMLElement & DebounceAttrs,
  binding: DirectiveBinding
) {
  const modifiers = binding.modifiers;
  let immediate = false;
  let debounceTime = 300;
  Object.keys(modifiers).forEach((key) => {
    if (typeof key === "number") {
      debounceTime = key;
    }
    if (key === "immediate") {
      immediate = true;
    }
  });
  el.debounceEventName = binding.arg || "click";
  el.debounceTime = debounceTime;
  el.immediate = immediate;
  el.debounceHandler = debounce(binding.value, el.debounceTime, el.immediate);
}

/**
 *  防抖指令
 * @example  v-debounce="() => {}"
 * @example  v-debounce.immediate="() => {}"
 * @example  v-debounce:click.immediate.1000="() => {}"
 *
 * */
export default {
  beforeMount(el: HTMLElement & DebounceAttrs, binding: DirectiveBinding) {
    getParamsFromBind(el, binding);
    el.debounceFunc = (...args: any[]) => el.debounceHandler(...args);
    el.addEventListener(el.debounceEventName, el.debounceFunc);
  },
  beforeUpdate(el: HTMLElement & DebounceAttrs, binding: DirectiveBinding) {
    getParamsFromBind(el, binding);
  },
  beforeUnmount(el: HTMLElement & DebounceAttrs) {
    el.removeEventListener(el.debounceEventName, el.debounceFunc);
  },
} as ObjectDirective;
