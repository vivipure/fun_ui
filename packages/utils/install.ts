import type { Plugin } from "vue";

export const withInstall = <T>(main: T) => {
  (main as SFCWithInstall<T>).install =(app) => {
    app.component((main as SFCWithInstall<T>).name, main)
  }

  return main as SFCWithInstall<T>
};

export type SFCWithInstall<T> = T & Plugin & { [key: string]: any };
