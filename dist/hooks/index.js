"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/hooks/usePinnedNav.ts
import { useState, useEffect, useCallback } from "react";

// src/components/NavContext.tsx
import { createContext, useContext } from "react";

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
import { jsx } from "react/jsx-runtime";
var NavConfigContext = createContext(null);
var useNavConfig = /* @__PURE__ */ __name(() => {
  const ctx = useContext(NavConfigContext);
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
var CustomIconContext = createContext({});
var BadgeContext = createContext({});
var useBadgeContext = /* @__PURE__ */ __name(() => {
  return useContext(BadgeContext);
}, "useBadgeContext");

// src/hooks/usePinnedNav.ts
function usePinnedNav() {
  const { pinnedStorage, onPinChange } = useNavConfig();
  const [pinnedItems, setPinnedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPinnedItems = useCallback(async () => {
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
  useEffect(() => {
    fetchPinnedItems();
  }, [fetchPinnedItems]);
  const saveItems = useCallback(
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
  const pinItem = useCallback(
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
  const unpinItem = useCallback(
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
  const reorderItems = useCallback(
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
  const isPinned = useCallback(
    (slug, type) => {
      return pinnedItems.some((item) => item.slug === slug && item.type === type);
    },
    [pinnedItems]
  );
  const togglePin = useCallback(
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
import { useMemo } from "react";
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
  return useMemo(() => {
    const badgeValue = badges[slug];
    return resolveBadgeValue(badgeValue);
  }, [badges, slug]);
}
__name(useBadge, "useBadge");
function useAllBadges() {
  const badges = useBadgeContext();
  return useMemo(() => {
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
export {
  getBadgeColorClass,
  useAllBadges,
  useBadge,
  usePinnedNav
};
//# sourceMappingURL=index.js.map