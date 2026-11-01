"use client";
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

// src/hooks/index.ts
var hooks_exports = {};
__export(hooks_exports, {
  getBadgeColorClass: () => getBadgeColorClass,
  useAllBadges: () => useAllBadges,
  useBadge: () => useBadge,
  usePinnedNav: () => usePinnedNav
});
module.exports = __toCommonJS(hooks_exports);

// src/hooks/usePinnedNav.ts
var import_react2 = require("react");

// src/components/NavContext.tsx
var import_react = require("react");

// src/defaults.ts
var DEFAULT_ICONS = {
  // ===== DASHBOARD =====
  dashboard: "layout-dashboard",
  // ===== COLLECTIONS =====
  // Content
  pages: "file-text",
  posts: "newspaper",
  media: "image",
  files: "file",
  categories: "folder-open",
  tags: "tag",
  badges: "award",
  // Users
  users: "users",
  // Chat & Messages
  chats: "message-square",
  messages: "send",
  "knowledge-base": "book-open",
  // Comments
  comments: "message-circle",
  // CRM
  contacts: "contact",
  "contact-fields": "database",
  "contact-notes": "sticky-note",
  leads: "target",
  deals: "briefcase",
  tickets: "ticket",
  activities: "activity",
  "customer-feedback": "thumbs-up",
  "customer-interests": "heart",
  // ===== GLOBALS =====
  // Layout
  header: "menu",
  footer: "layout-template",
  // Analytics & Dashboard
  "analytics-settings": "bar-chart-3",
  "chat-dashboard": "layout-dashboard",
  "crm-dashboard": "layout-dashboard",
  "comments-dashboard": "layout-dashboard",
  // Settings
  settings: "settings",
  "chat-config": "message-square",
  "ai-config": "bot",
  "posts-page-settings": "newspaper",
  // Appearance
  "theme-settings": "palette",
  // Tools
  "wordpress-import": "file-down",
  "company-info": "building-2",
  "image-optimizer": "image-plus",
  "floating-action-button": "mouse-pointer-click",
  // Search & Navigation
  search: "search",
  redirects: "arrow-right-left",
  // Form
  "form-submissions": "database",
  // Advanced / Fallback
  advanced: "wrench",
  // ===== CUSTOM LINKS =====
  // Default icons for custom links
  link: "link",
  "external-link": "external-link",
  external: "external-link",
  globe: "globe",
  sparkles: "sparkles",
  zap: "zap",
  star: "star",
  folder: "folder",
  "file-code": "file-code",
  terminal: "terminal",
  help: "help-circle",
  info: "info",
  docs: "book-marked",
  documentation: "book-marked",
  api: "terminal",
  custom: "sparkles",
  // Common social/dev icons
  github: "github",
  rocket: "rocket",
  chart: "bar-chart-3",
  book: "book-open"
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

// src/components/NavContext.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var NavConfigContext = (0, import_react.createContext)(null);
var useNavConfig = /* @__PURE__ */ __name(() => {
  const ctx = (0, import_react.useContext)(NavConfigContext);
  if (!ctx) {
    return {
      icons: DEFAULT_ICONS,
      // Now returns Record<string, string>
      classPrefix: "nav",
      enablePinning: true,
      pinnedStorage: "preferences",
      cssVariables: DEFAULT_BADGE_COLORS,
      customLinks: []
    };
  }
  return ctx;
}, "useNavConfig");
var CustomIconContext = (0, import_react.createContext)({});
var BadgeContext = (0, import_react.createContext)({});
var useBadgeContext = /* @__PURE__ */ __name(() => {
  return (0, import_react.useContext)(BadgeContext);
}, "useBadgeContext");

// src/hooks/usePinnedNav.ts
function usePinnedNav() {
  const { pinnedStorage, onPinChange } = useNavConfig();
  const [pinnedItems, setPinnedItems] = (0, import_react2.useState)([]);
  const [loading, setLoading] = (0, import_react2.useState)(true);
  const fetchPinnedItems = (0, import_react2.useCallback)(async () => {
    try {
      if (pinnedStorage === "localStorage") {
        const stored = localStorage.getItem("nav-pinned");
        setPinnedItems(stored ? JSON.parse(stored) : []);
      } else {
        const res = await fetch("/api/nav/pinned");
        const data = await res.json();
        setPinnedItems(data.pinnedItems || []);
      }
    } catch (error) {
      console.error("Error fetching pinned items:", error);
      setPinnedItems([]);
    } finally {
      setLoading(false);
    }
  }, [pinnedStorage]);
  (0, import_react2.useEffect)(() => {
    fetchPinnedItems();
  }, [fetchPinnedItems]);
  const saveItems = (0, import_react2.useCallback)(
    async (items) => {
      if (pinnedStorage === "localStorage") {
        localStorage.setItem("nav-pinned", JSON.stringify(items));
        return items;
      } else {
        return items;
      }
    },
    [pinnedStorage]
  );
  const pinItem = (0, import_react2.useCallback)(
    async (slug, type) => {
      const newItem = { slug, type, order: pinnedItems.length };
      setPinnedItems((prev) => [...prev, newItem]);
      try {
        if (pinnedStorage === "localStorage") {
          await saveItems([...pinnedItems, newItem]);
        } else {
          const res = await fetch("/api/nav/pin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug, type })
          });
          const data = await res.json();
          if (data.pinnedItems) {
            setPinnedItems(data.pinnedItems);
          }
        }
        onPinChange?.(newItem, "pin");
      } catch (error) {
        console.error("Error pinning item:", error);
        await fetchPinnedItems();
      }
    },
    [pinnedItems, pinnedStorage, saveItems, fetchPinnedItems, onPinChange]
  );
  const unpinItem = (0, import_react2.useCallback)(
    async (slug, type) => {
      const item = pinnedItems.find((i) => i.slug === slug && i.type === type);
      setPinnedItems((prev) => prev.filter((i) => !(i.slug === slug && i.type === type)));
      try {
        if (pinnedStorage === "localStorage") {
          const newItems = pinnedItems.filter((i) => !(i.slug === slug && i.type === type));
          await saveItems(newItems);
        } else {
          const res = await fetch("/api/nav/unpin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug, type })
          });
          const data = await res.json();
          if (data.pinnedItems) {
            setPinnedItems(data.pinnedItems);
          }
        }
        if (item) {
          onPinChange?.(item, "unpin");
        }
      } catch (error) {
        console.error("Error unpinning item:", error);
        await fetchPinnedItems();
      }
    },
    [pinnedItems, pinnedStorage, saveItems, fetchPinnedItems, onPinChange]
  );
  const reorderItems = (0, import_react2.useCallback)(
    async (items) => {
      setPinnedItems(items);
      try {
        if (pinnedStorage === "localStorage") {
          await saveItems(items);
        } else {
          const res = await fetch("/api/nav/reorder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items })
          });
          const data = await res.json();
          if (data.pinnedItems) {
            setPinnedItems(data.pinnedItems);
          }
        }
      } catch (error) {
        console.error("Error reordering items:", error);
        await fetchPinnedItems();
      }
    },
    [pinnedStorage, saveItems, fetchPinnedItems]
  );
  const isPinned = (0, import_react2.useCallback)(
    (slug, type) => {
      return pinnedItems.some((item) => item.slug === slug && item.type === type);
    },
    [pinnedItems]
  );
  const togglePin = (0, import_react2.useCallback)(
    async (slug, type) => {
      if (isPinned(slug, type)) {
        await unpinItem(slug, type);
      } else {
        await pinItem(slug, type);
      }
    },
    [isPinned, pinItem, unpinItem]
  );
  return {
    pinnedItems,
    loading,
    pinItem,
    unpinItem,
    reorderItems,
    isPinned,
    togglePin,
    refresh: fetchPinnedItems
  };
}
__name(usePinnedNav, "usePinnedNav");

// src/hooks/useBadge.ts
var import_react3 = require("react");
function resolveBadgeValue(value) {
  if (value === void 0 || value === null) return null;
  if (typeof value === "number") {
    return value > 0 ? { count: value, color: "red" } : null;
  }
  return value.count > 0 ? { count: value.count, color: value.color ?? "red" } : null;
}
__name(resolveBadgeValue, "resolveBadgeValue");
function useBadge(slug) {
  const badges = useBadgeContext();
  return (0, import_react3.useMemo)(() => {
    const badgeValue = badges[slug];
    return resolveBadgeValue(badgeValue);
  }, [badges, slug]);
}
__name(useBadge, "useBadge");
function useAllBadges() {
  const badges = useBadgeContext();
  return (0, import_react3.useMemo)(() => {
    const resolved = {};
    for (const [slug, value] of Object.entries(badges)) {
      const badge = resolveBadgeValue(value);
      if (badge) {
        resolved[slug] = badge;
      }
    }
    return resolved;
  }, [badges]);
}
__name(useAllBadges, "useAllBadges");
function getBadgeColorClass(color, classPrefix = "nav") {
  return `${classPrefix}__link-badge--${color}`;
}
__name(getBadgeColorClass, "getBadgeColorClass");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getBadgeColorClass,
  useAllBadges,
  useBadge,
  usePinnedNav
});
//# sourceMappingURL=index.cjs.map