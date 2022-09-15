import type { App, Plugin } from "@vue/runtime-core";
import * as componentsMap from "./components/index";
import * as directivesMap from "./directives/index";
import packageJSON from "../package.json";

const INSTALLED_KEY = "__FunUI";

const components = Object.values(componentsMap) as Plugin[];
const directives = Object.values(directivesMap) as Plugin[];


interface InstalledInterface {
  __FunUI: boolean;
}

const install = (app: App & InstalledInterface) => {
  if (app[INSTALLED_KEY]) return;
  app[INSTALLED_KEY] = true;
  components.forEach((c) => app.use(c));
  directives.forEach((c) => app.use(c));
};

export default {
  install,
  version: packageJSON.version,
};
