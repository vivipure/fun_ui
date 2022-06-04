import type { DirectiveBinding, ObjectDirective } from "vue";

export default {
  beforeMount(
    el: HTMLElement & {
      throttleFunc(e: Event): void;
      throttleHandler(...args: any[]): any;
    },
    binding: DirectiveBinding
  ) {
    el.throttleHandler = binding.value;
    const throttleTime = +Object.keys(binding.modifiers)[0] || 2000;
    let time = Date.now();
    el.throttleFunc = (...args: any[]) => {
      // fix disabled elem
      if (el.getAttribute("disabled")) return;

      let currentTime = Date.now();
      if (currentTime - time < throttleTime) return;
      el.throttleHandler(...args);
      time = currentTime;
    };
    el.addEventListener("click", el.throttleFunc);
  },
  beforeUpdate(el, binding) {
    el.throttleHandler = binding.value;
  },

  beforeUnmount(el: HTMLElement & { throttleFunc(): void }) {
    el.removeEventListener("click", el.throttleFunc);
  },
} as ObjectDirective;
