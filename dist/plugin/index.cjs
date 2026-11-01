"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/plugin/index.ts
var plugin_exports = {};
__export(plugin_exports, {
  PLUGIN_OPTIONS_KEY: () => PLUGIN_OPTIONS_KEY,
  default: () => plugin_default,
  getPluginOptions: () => getPluginOptions,
  payloadSidebar: () => payloadSidebar
});
module.exports = __toCommonJS(plugin_exports);
var PLUGIN_OPTIONS_KEY = "payloadSidebarOptions";
var getPluginOptions = /* @__PURE__ */ __name((config) => {
  return config.custom?.[PLUGIN_OPTIONS_KEY] || {};
}, "getPluginOptions");
function serializeCustomLink(link) {
  let iconKey;
  if (link.icon) {
    if (typeof link.icon === "function") {
      iconKey = link.icon.displayName || link.icon.name || "custom";
    } else {
      iconKey = String(link.icon);
    }
  }
  return {
    label: link.label,
    href: link.href,
    group: link.group,
    icon: iconKey,
    external: link.external,
    pinnable: link.pinnable,
    order: link.order
  };
}
__name(serializeCustomLink, "serializeCustomLink");
var payloadSidebar = /* @__PURE__ */ __name((options = {}) => {
  return (incomingConfig) => {
    const config = { ...incomingConfig };
    config.admin = config.admin || {};
    config.admin.components = config.admin.components || {};
    config.admin.components.Nav = "payload-sidebar-plugin/rsc#CustomNav";
    const serializableOptions = {
      groupOrder: options.groupOrder,
      icons: options.icons,
      customLinks: options.customLinks?.map(serializeCustomLink),
      customGroups: options.customGroups,
      enablePinning: options.enablePinning,
      pinnedStorage: options.pinnedStorage,
      classPrefix: options.classPrefix,
      cssVariables: options.cssVariables
    };
    config.custom = config.custom || {};
    config.custom[PLUGIN_OPTIONS_KEY] = serializableOptions;
    return config;
  };
}, "payloadSidebar");
var plugin_default = payloadSidebar;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PLUGIN_OPTIONS_KEY,
  getPluginOptions,
  payloadSidebar
});
//# sourceMappingURL=index.cjs.map