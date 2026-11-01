var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/plugin/index.ts
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
export {
  PLUGIN_OPTIONS_KEY,
  plugin_default as default,
  getPluginOptions,
  payloadSidebar
};
//# sourceMappingURL=index.js.map