import { Component, createApp } from "vue";

export const debounce = (
  fn: (...args: any[]) => any,
  time: number,
  immediate: boolean
) => {
  let timeout: number | null;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    var context = this;
    if (immediate) {
      let canCall = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, time);
      if (canCall) fn.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        fn.apply(context, args);
      }, time);
    }
  };
};

export const componentToFunction = (component: Component) => {
  return function (options?: { [key: string]: any }) {
    const divWrapper = document.createElement("div");
    const instance = createApp(component, options);
    const vm = instance.mount(document.createElement("div"));

    if (options)
      for (let props in options) {
        if ((instance as Object).hasOwnProperty(props)) {
        }
      }
    return vm;
  };
};
