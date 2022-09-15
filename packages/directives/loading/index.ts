import type { DirectiveBinding, ObjectDirective, VNode } from "vue";
import { componentToFunction } from "../../utils/help";
import Loading from "./Loading.vue";

const loadingFunction = componentToFunction(Loading);

export default {
  mounted(
    el: HTMLElement & {
      loadingInstance: any;
    },
    binding: DirectiveBinding,
    vm: VNode
  ) {
    el.loadingInstance = loadingFunction({});
    console.log(el.loadingInstance);
    el.appendChild(el.loadingInstance.$el);
  },
  beforeUpdate(el, binding) {
    console.log(el.loadingInstance)
  },

  beforeUnmount(el: HTMLElement & { throttleFunc(): void }) {},
} as ObjectDirective;
