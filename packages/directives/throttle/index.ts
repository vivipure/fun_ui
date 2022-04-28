import type { DirectiveBinding, ObjectDirective } from "vue";

export default {
  beforeMount(
    el: HTMLElement & { throttleFunc(): void },
    binding: DirectiveBinding
  ) {
    const handler = binding.value;
    const throttleTime = +Object.keys(binding.modifiers)[0] || 2000;
    let time = Date.now();
    el.throttleFunc = () => {
      // fix disabled elem
      if (el.getAttribute("disabled")) return;

      let currentTime = Date.now();
      if (currentTime - time < throttleTime) return;
      handler();
      time = currentTime;
    };
    el.addEventListener("click", el.throttleFunc);
  },
  beforeUnmount(el: HTMLElement & { throttleFunc(): void }) {
    console.log("yes");
    el.removeEventListener("click", el.throttleFunc);
  },
} as ObjectDirective;
