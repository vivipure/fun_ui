import { NOOP } from "@vue/shared";
import type { Plugin } from "vue";

export const withInstall = <T, E extends Record<string, any>>(
  main: T,
  extra?: E
) => {
  (<SFCWithInstall<T>>main).install = (app) => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp);
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      (<SFCWithInstall<T>>main)[key] = comp;
    }
  }
  return main as SFCWithInstall<T> & E;
};

export type SFCWithInstall<T> = T & Plugin;
