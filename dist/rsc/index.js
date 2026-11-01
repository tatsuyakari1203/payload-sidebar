var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/components/CustomNav/index.tsx
import { Logout } from "@payloadcms/ui";
import { RenderServerComponent } from "@payloadcms/ui/elements/RenderServerComponent";
import { EntityType, groupNavItems } from "@payloadcms/ui/shared";
import { getTranslation } from "@payloadcms/translations";
import { CustomNavClient } from "payload-sidebar-plugin/components";

// src/utils/sortGroups.ts
function sortGroups(groups, groupOrder) {
  return [...groups].sort((a, b) => {
    const orderA = groupOrder[a.label] ?? 50;
    const orderB = groupOrder[b.label] ?? 50;
    return orderA - orderB;
  });
}
__name(sortGroups, "sortGroups");

// src/defaults.ts
var DEFAULT_GROUP_ORDER = {
  // Vietnamese
  "N\u1ED9i dung": 1,
  "Ng\u01B0\u1EDDi d\xF9ng": 2,
  "B\u1ED1 c\u1EE5c": 3,
  "C\xE0i \u0111\u1EB7t": 4,
  "Chat & AI": 5,
  CRM: 6,
  "Giao di\u1EC7n": 7,
  "C\xF4ng c\u1EE5": 8,
  "N\xE2ng cao": 99,
  // Always last
  // English
  Content: 1,
  Users: 2,
  Layout: 3,
  Settings: 4,
  Appearance: 7,
  Tools: 8,
  Advanced: 99,
  // Always last
  // Default Payload groups
  collections: 1,
  globals: 2
};
var DEFAULT_BADGE_COLORS = {
  "--badge-red-bg": "var(--theme-error-500, #ef4444)",
  "--badge-red-text": "#ffffff",
  "--badge-yellow-bg": "var(--theme-warning-500, #eab308)",
  "--badge-yellow-text": "#000000",
  "--badge-blue-bg": "var(--theme-elevation-500, #3b82f6)",
  "--badge-blue-text": "#ffffff",
  "--badge-green-bg": "var(--theme-success-500, #22c55e)",
  "--badge-green-text": "#ffffff",
  "--badge-orange-bg": "#f97316",
  "--badge-orange-text": "#ffffff",
  "--badge-gray-bg": "var(--theme-elevation-300, #6b7280)",
  "--badge-gray-text": "#ffffff"
};

// src/plugin/index.ts
var PLUGIN_OPTIONS_KEY = "payloadSidebarOptions";
var getPluginOptions = /* @__PURE__ */ __name((config) => {
  return config.custom?.[PLUGIN_OPTIONS_KEY] || {};
}, "getPluginOptions");

// src/components/CustomNav/index.tsx
import { jsx } from "react/jsx-runtime";
async function getNavPrefs(req) {
  if (!req?.user) return null;
  try {
    const preferences = await req.payload.find({
      collection: "payload-preferences",
      where: {
        key: { equals: "nav" },
        "user.relationTo": { equals: "users" },
        "user.value": { equals: req.user.id }
      },
      limit: 1,
      depth: 0
    });
    return preferences.docs[0]?.value || null;
  } catch {
    return null;
  }
}
__name(getNavPrefs, "getNavPrefs");
function customLinkToNavEntity(link) {
  const slug = `custom-${link.label.toLowerCase().replace(/\s+/g, "-")}`;
  const isExternal = link.external ?? (link.href.startsWith("http://") || link.href.startsWith("https://") || link.href.startsWith("//"));
  return {
    slug,
    type: "custom",
    label: link.label,
    href: link.href,
    external: isExternal,
    icon: link.icon,
    // Now a string key
    pinnable: link.pinnable ?? true,
    order: link.order ?? 50
  };
}
__name(customLinkToNavEntity, "customLinkToNavEntity");
function mergeCustomLinks(groups, customLinks = [], customGroups = []) {
  if (!customLinks.length && !customGroups.length) {
    return groups;
  }
  const aliasMap = /* @__PURE__ */ new Map();
  for (const customGroup of customGroups) {
    aliasMap.set(customGroup.label, customGroup.label);
    if (customGroup.aliases) {
      for (const alias of customGroup.aliases) {
        aliasMap.set(alias, customGroup.label);
      }
    }
  }
  const mergedGroups = groups.map((g) => ({
    ...g,
    entities: [...g.entities]
  }));
  const groupMap = /* @__PURE__ */ new Map();
  mergedGroups.forEach((g) => {
    const primaryLabel = aliasMap.get(g.label) || g.label;
    if (!groupMap.has(primaryLabel)) {
      groupMap.set(primaryLabel, g);
    }
  });
  for (const customGroup of customGroups) {
    if (!groupMap.has(customGroup.label)) {
      const newGroup = {
        label: customGroup.label,
        entities: []
      };
      mergedGroups.push(newGroup);
      groupMap.set(customGroup.label, newGroup);
    }
  }
  for (const link of customLinks) {
    const linkGroupLabel = link.group ?? "Custom";
    const primaryGroupLabel = aliasMap.get(linkGroupLabel) || linkGroupLabel;
    const navEntity = customLinkToNavEntity(link);
    let targetGroup = groupMap.get(primaryGroupLabel);
    if (!targetGroup) {
      targetGroup = {
        label: primaryGroupLabel,
        entities: []
      };
      mergedGroups.push(targetGroup);
      groupMap.set(primaryGroupLabel, targetGroup);
    }
    targetGroup.entities.push(navEntity);
  }
  for (const group of mergedGroups) {
    group.entities.sort((a, b) => {
      const orderA = a.order ?? 50;
      const orderB = b.order ?? 50;
      return orderA - orderB;
    });
  }
  const primaryLabels = new Set(customGroups.map((g) => g.label));
  const filteredGroups = mergedGroups.filter((group) => {
    if (group.entities.length > 0) return true;
    if (primaryLabels.has(group.label)) return true;
    const primaryLabel = aliasMap.get(group.label);
    if (!primaryLabel || primaryLabel === group.label) return true;
    return false;
  });
  return filteredGroups;
}
__name(mergeCustomLinks, "mergeCustomLinks");
function buildGroupOrder(defaultOrder, pluginOrder = {}, customGroups = []) {
  const order = { ...defaultOrder, ...pluginOrder };
  for (const group of customGroups) {
    if (group.order !== void 0) {
      order[group.label] = group.order;
    }
  }
  return order;
}
__name(buildGroupOrder, "buildGroupOrder");
async function CustomNav(props) {
  const {
    documentSubViewType,
    i18n,
    locale,
    params,
    payload,
    permissions,
    req,
    searchParams,
    user,
    viewType,
    visibleEntities
  } = props;
  if (!payload?.config) {
    return null;
  }
  const pluginOptions = getPluginOptions(payload.config);
  const groupOrder = buildGroupOrder(
    DEFAULT_GROUP_ORDER,
    pluginOptions.groupOrder,
    pluginOptions.customGroups
  );
  const classPrefix = pluginOptions.classPrefix ?? "nav";
  const enablePinning = pluginOptions.enablePinning ?? true;
  const pinnedStorage = pluginOptions.pinnedStorage ?? "preferences";
  const cssVariables = { ...DEFAULT_BADGE_COLORS, ...pluginOptions.cssVariables };
  const customLinks = pluginOptions.customLinks ?? [];
  const customGroups = pluginOptions.customGroups ?? [];
  const icons = pluginOptions.icons ?? {};
  const {
    admin: { components },
    routes: { admin: adminRoute },
    collections,
    globals
  } = payload.config;
  const navComponents = components;
  const { afterNav, afterNavLinks, beforeNav, beforeNavLinks, logout } = navComponents;
  const groups = groupNavItems(
    [
      ...collections.filter(({ slug }) => visibleEntities?.collections?.includes(slug)).map(
        (collection) => ({
          type: EntityType.collection,
          entity: collection
        })
      ),
      ...globals.filter(({ slug }) => visibleEntities?.globals?.includes(slug)).map(
        (global) => ({
          type: EntityType.global,
          entity: global
        })
      )
    ],
    permissions,
    i18n
  );
  const payloadGroups = groups.map((g) => ({
    label: g.label,
    entities: g.entities.map((e) => ({
      slug: e.slug,
      type: e.type === EntityType.collection ? "collection" : "global",
      label: typeof e.label === "string" ? e.label : getTranslation(e.label, i18n)
    }))
  }));
  const mergedGroups = mergeCustomLinks(payloadGroups, customLinks, customGroups);
  const sortedGroups = sortGroups(mergedGroups, groupOrder);
  const navPreferences = await getNavPrefs(req);
  const navConfig = {
    classPrefix,
    enablePinning,
    pinnedStorage,
    cssVariables,
    customLinks,
    icons
  };
  const BeforeNavComponent = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType
    },
    Component: beforeNav,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user
    }
  });
  const LogoutComponent = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType
    },
    Component: logout?.Button,
    Fallback: Logout,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user
    }
  });
  const AfterNavComponent = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType
    },
    Component: afterNav,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user
    }
  });
  const BeforeNavLinksComponent = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType
    },
    Component: beforeNavLinks,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user
    }
  });
  const AfterNavLinksComponent = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType
    },
    Component: afterNavLinks,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user
    }
  });
  return /* @__PURE__ */ jsx(
    CustomNavClient,
    {
      classPrefix,
      groups: sortedGroups,
      adminRoute,
      navPreferences,
      navConfig,
      beforeNav: BeforeNavComponent,
      beforeNavLinks: BeforeNavLinksComponent,
      afterNavLinks: AfterNavLinksComponent,
      afterNav: AfterNavComponent,
      logoutComponent: LogoutComponent
    }
  );
}
__name(CustomNav, "CustomNav");
export {
  CustomNav
};
//# sourceMappingURL=index.js.map