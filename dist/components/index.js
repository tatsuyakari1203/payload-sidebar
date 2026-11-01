"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/components/CustomNav/index.client.tsx
import { useNav } from "@payloadcms/ui";

// src/components/CustomNav/StyleInjector.tsx
import { useLayoutEffect } from "react";

// src/components/CustomNav/styles.scss
var styles_default = `.nav {
  --sidebar-bg: var(--theme-bg);
  --sidebar-text: var(--theme-elevation-700);
  --sidebar-text-hover: var(--theme-elevation-900);
  --sidebar-text-active: var(--theme-elevation-1000);
  --sidebar-accent: var(--theme-elevation-100);
  --sidebar-border: var(--theme-elevation-100);
  --sidebar-icon: var(--theme-elevation-500);
  --sidebar-icon-active: var(--theme-success-500);
  --tree-line: var(--theme-elevation-200);
  --badge-red-bg: var(--theme-error-500, #ef4444);
  --badge-red-text: #ffffff;
  --badge-yellow-bg: var(--theme-warning-500, #eab308);
  --badge-yellow-text: #000000;
  --badge-blue-bg: #3b82f6;
  --badge-blue-text: #ffffff;
  --badge-green-bg: var(--theme-success-500, #22c55e);
  --badge-green-text: #ffffff;
  --badge-orange-bg: #f97316;
  --badge-orange-text: #ffffff;
  --badge-gray-bg: var(--theme-elevation-400, #6b7280);
  --badge-gray-text: #ffffff;
  position: sticky;
  top: 0;
  left: 0;
  flex-shrink: 0;
  height: 100vh;
  width: var(--nav-width);
  background: var(--sidebar-bg);
  border-right: 1px solid var(--sidebar-border);
  opacity: 0;
  overflow: hidden;
  font-size: 13px;
  --nav-padding-inline-start: 16px;
  --nav-padding-inline-end: 16px;
  --nav-padding-block-start: var(--app-header-height);
  --nav-padding-block-end: 16px;
}
[dir=rtl] .nav {
  border-right: none;
  border-left: 1px solid var(--sidebar-border);
}
.nav--nav-animate {
  transition: opacity 180ms ease;
}
.nav--nav-open {
  opacity: 1;
}
.nav__scroll {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--nav-padding-block-start) var(--nav-padding-inline-end) var(--nav-padding-block-end) var(--nav-padding-inline-start);
  overflow-y: auto;
  overflow-x: hidden;
}
.nav__scroll::-webkit-scrollbar {
  width: 8px;
}
.nav__scroll::-webkit-scrollbar-track {
  background: transparent;
}
.nav__scroll::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
}
.nav__scroll:hover::-webkit-scrollbar-thumb {
  background: var(--theme-elevation-150);
}
.nav__wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
}
.nav__link {
  display: flex;
  align-items: center;
  gap: 10px;
  width: calc(100% + 32px) !important;
  margin-left: -16px !important;
  margin-right: -16px !important;
  padding: 7px 28px !important;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--sidebar-text);
  text-decoration: none !important;
  border-radius: 0;
  position: relative;
  transition: background-color 100ms ease, color 100ms ease;
}
.nav__link:hover {
  background: var(--sidebar-accent);
  color: var(--sidebar-text-hover);
}
.nav__link:hover .nav__link-icon {
  color: var(--sidebar-text-hover);
}
.nav__link:focus-visible {
  outline: 2px solid var(--theme-elevation-300);
  outline-offset: -2px;
}
.nav__link--active {
  background: var(--sidebar-accent);
  color: var(--sidebar-text-active);
  font-weight: 500;
}
.nav__link--active .nav__link-icon {
  color: var(--sidebar-icon-active);
}
.nav__link-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--sidebar-icon);
  transition: color 100ms ease;
}
.nav__link-external-icon {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  color: var(--theme-elevation-400);
  margin-left: -4px;
  opacity: 0.7;
}
.nav__link-label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nav__link--external:hover .nav__link-external-icon {
  opacity: 1;
  color: var(--sidebar-text-hover);
}
.nav__link-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  margin-left: auto;
  margin-right: 24px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 9px;
  flex-shrink: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: geometricPrecision;
  backface-visibility: hidden;
  transform: translateZ(0);
  background: var(--badge-red-bg);
  color: var(--badge-red-text);
}
.nav__link-badge--red {
  background: var(--badge-red-bg);
  color: var(--badge-red-text);
}
.nav__link-badge--yellow {
  background: var(--badge-yellow-bg);
  color: var(--badge-yellow-text);
}
.nav__link-badge--blue {
  background: var(--badge-blue-bg);
  color: var(--badge-blue-text);
}
.nav__link-badge--green {
  background: var(--badge-green-bg);
  color: var(--badge-green-text);
}
.nav__link-badge--orange {
  background: var(--badge-orange-bg);
  color: var(--badge-orange-text);
}
.nav__link-badge--gray {
  background: var(--badge-gray-bg);
  color: var(--badge-gray-text);
}
.nav__controls {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--sidebar-border);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav__controls .btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 8px;
  font-size: 13px;
  font-weight: 400;
  color: var(--sidebar-text);
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 100ms ease, color 100ms ease;
}
.nav__controls .btn:hover {
  background: var(--sidebar-accent);
  color: var(--sidebar-text-hover);
}
.nav__controls .btn svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--sidebar-icon);
}
@media (max-width: 1024px) {
  .nav__scroll {
    --nav-padding-inline-start: 12px;
    --nav-padding-inline-end: 12px;
  }
}
@media (max-width: 768px) {
  .nav__scroll {
    --nav-padding-inline-start: var(--gutter-h);
    --nav-padding-inline-end: var(--gutter-h);
  }
  .nav__link {
    padding: 8px 12px;
    font-size: 14px;
  }
}
.nav__pinned-section {
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--sidebar-border);
}
.nav__pinned-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--theme-elevation-500);
}
.nav__pinned-header svg {
  width: 12px;
  height: 12px;
  color: var(--theme-elevation-400);
}
.nav__pinned-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav__pinned-item {
  display: flex;
  align-items: center;
  position: relative;
}
.nav__pinned-item .nav__link {
  flex: 1;
  padding-right: 36px !important;
}
.nav__unpin-btn {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: var(--theme-elevation-400);
  opacity: 0;
  transition: all 100ms ease;
}
.nav__unpin-btn:hover {
  background: var(--theme-elevation-150);
  color: var(--theme-error-500);
}
.nav__pinned-item:hover .nav__unpin-btn {
  opacity: 1;
}
.nav__link-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}
.nav__link-wrapper .nav__link {
  flex: 1;
  padding-right: 36px !important;
}
.nav__pin-btn {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: var(--theme-elevation-400);
  opacity: 0;
  transition: all 100ms ease;
}
.nav__pin-btn:hover {
  background: var(--theme-elevation-150);
  color: var(--theme-elevation-800);
}
.nav__pin-btn--pinned {
  color: var(--theme-success-500);
}
.nav__pin-btn--pinned:hover {
  color: var(--theme-success-600);
}
.nav__link-wrapper:hover .nav__pin-btn {
  opacity: 1;
}
.nav__pin-btn--pinned {
  opacity: 0.7;
}
.nav__link-wrapper:hover .nav__pin-btn--pinned {
  opacity: 1;
}

.nav-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}
.nav-group__toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--theme-elevation-500) !important;
  background: transparent !important;
  border: none !important;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  transition: background-color 100ms ease, color 100ms ease;
}
.nav-group__toggle:hover {
  background: var(--sidebar-accent) !important;
  color: var(--sidebar-text-hover) !important;
}
.nav-group__toggle svg {
  width: 12px !important;
  height: 12px !important;
  color: var(--theme-elevation-400);
  transition: transform 150ms ease;
  flex-shrink: 0;
}
.nav-group__content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 0 !important;
  position: relative;
}
.nav-group--collapsed .nav-group__toggle svg {
  transform: rotate(-90deg);
}

.collapsible__toggle {
  border-radius: 6px !important;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL1VzZXJzL2tmaXJvc3MvRG9jdW1lbnRzL1Byb2plY3RzL3BheWxvYWQtcGx1Z2lucy9wYXlsb2FkLXNpZGViYXIvc3JjL2NvbXBvbmVudHMvQ3VzdG9tTmF2Iiwic291cmNlcyI6WyJzdHlsZXMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQkE7RUFFSTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFHQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFHQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBOztBQUdGO0VBQ0U7O0FBR0Y7RUFDRTs7QUFJRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBRUE7RUFDQTs7QUFHQTtFQUNFOztBQUdGO0VBQ0U7O0FBR0Y7RUFDRTtFQUNBOztBQUdGO0VBQ0U7O0FBSUo7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUlGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLFlBQ0U7O0FBR0Y7RUFDRTtFQUNBOztBQUVBO0VBQ0U7O0FBSUo7RUFDRTtFQUNBOztBQUlGO0VBQ0U7RUFDQTtFQUNBOztBQUVBO0VBQ0U7O0FBTU47RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUlGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7O0FBU0E7RUFDRTtFQUNBOztBQUtKO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUdBO0VBQ0E7O0FBR0E7RUFDRTtFQUNBOztBQUdGO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBOztBQUdGO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7O0FBS0o7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxZQUNFOztBQUdGO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQXhSUjtFQStSSTtJQUNFO0lBQ0E7OztBQTNSTjtFQWdTSTtJQUNFO0lBQ0E7O0VBR0Y7SUFDRTtJQUNBOzs7QUFLSjtFQUNFO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7RUFDQTs7QUFJSjtFQUNFO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7O0FBSUo7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTs7QUFJSjtFQUNFOztBQUlGO0VBQ0U7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTs7QUFJSjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBOztBQUdGO0VBQ0U7O0FBRUE7RUFDRTs7QUFLTjtFQUNFOztBQUdGO0VBQ0U7O0FBR0Y7RUFDRTs7O0FBS0o7RUFDRTtFQUNBO0VBQ0E7O0FBR0E7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsWUFDRTs7QUFHRjtFQUNFO0VBQ0E7O0FBSUY7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUlKO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFLQTtFQUNFOzs7QUFPSjtFQUNFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGF5bG9hZC1zaWRlYmFyLXBsdWdpblxuLy8gRmlsZSBUcmVlIFN0eWxlIFNpZGViYXIgd2l0aCBMdWNpZGUgSWNvbnMgYW5kIE11bHRpLWNvbG9yIEJhZGdlc1xuLy8gTm90ZTogVGhpcyBmaWxlIHNob3VsZCBiZSBpbXBvcnRlZCBpbiB0aGUgYXBwLCBub3QgYnVuZGxlZCB3aXRoIHRoZSBwbHVnaW5cblxuLy8gTWl4aW4gcmVwbGFjZW1lbnRzIChzaW1wbGlmaWVkIHZlcnNpb25zKVxuQG1peGluIG1pZC1icmVhayB7XG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMDI0cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gc21hbGwtYnJlYWsge1xuICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG4ubmF2IHtcbiAgICAvLyA9PT09PT09PT09IFRIRU1FIFZBUklBQkxFUyA9PT09PT09PT09XG4gICAgLS1zaWRlYmFyLWJnOiB2YXIoLS10aGVtZS1iZyk7XG4gICAgLS1zaWRlYmFyLXRleHQ6IHZhcigtLXRoZW1lLWVsZXZhdGlvbi03MDApO1xuICAgIC0tc2lkZWJhci10ZXh0LWhvdmVyOiB2YXIoLS10aGVtZS1lbGV2YXRpb24tOTAwKTtcbiAgICAtLXNpZGViYXItdGV4dC1hY3RpdmU6IHZhcigtLXRoZW1lLWVsZXZhdGlvbi0xMDAwKTtcbiAgICAtLXNpZGViYXItYWNjZW50OiB2YXIoLS10aGVtZS1lbGV2YXRpb24tMTAwKTtcbiAgICAtLXNpZGViYXItYm9yZGVyOiB2YXIoLS10aGVtZS1lbGV2YXRpb24tMTAwKTtcbiAgICAtLXNpZGViYXItaWNvbjogdmFyKC0tdGhlbWUtZWxldmF0aW9uLTUwMCk7XG4gICAgLS1zaWRlYmFyLWljb24tYWN0aXZlOiB2YXIoLS10aGVtZS1zdWNjZXNzLTUwMCk7XG4gICAgLS10cmVlLWxpbmU6IHZhcigtLXRoZW1lLWVsZXZhdGlvbi0yMDApO1xuXG4gICAgLy8gPT09PT09PT09PSBCQURHRSBDT0xPUiBWQVJJQUJMRVMgPT09PT09PT09PVxuICAgIC0tYmFkZ2UtcmVkLWJnOiB2YXIoLS10aGVtZS1lcnJvci01MDAsICNlZjQ0NDQpO1xuICAgIC0tYmFkZ2UtcmVkLXRleHQ6ICNmZmZmZmY7XG4gICAgLS1iYWRnZS15ZWxsb3ctYmc6IHZhcigtLXRoZW1lLXdhcm5pbmctNTAwLCAjZWFiMzA4KTtcbiAgICAtLWJhZGdlLXllbGxvdy10ZXh0OiAjMDAwMDAwO1xuICAgIC0tYmFkZ2UtYmx1ZS1iZzogIzNiODJmNjtcbiAgICAtLWJhZGdlLWJsdWUtdGV4dDogI2ZmZmZmZjtcbiAgICAtLWJhZGdlLWdyZWVuLWJnOiB2YXIoLS10aGVtZS1zdWNjZXNzLTUwMCwgIzIyYzU1ZSk7XG4gICAgLS1iYWRnZS1ncmVlbi10ZXh0OiAjZmZmZmZmO1xuICAgIC0tYmFkZ2Utb3JhbmdlLWJnOiAjZjk3MzE2O1xuICAgIC0tYmFkZ2Utb3JhbmdlLXRleHQ6ICNmZmZmZmY7XG4gICAgLS1iYWRnZS1ncmF5LWJnOiB2YXIoLS10aGVtZS1lbGV2YXRpb24tNDAwLCAjNmI3MjgwKTtcbiAgICAtLWJhZGdlLWdyYXktdGV4dDogI2ZmZmZmZjtcblxuICAgIC8vID09PT09PT09PT0gQkFTRSBTVFlMRVMgPT09PT09PT09PVxuICAgIHBvc2l0aW9uOiBzdGlja3k7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICB3aWR0aDogdmFyKC0tbmF2LXdpZHRoKTtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zaWRlYmFyLWJnKTtcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1zaWRlYmFyLWJvcmRlcik7XG4gICAgb3BhY2l0eTogMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAtLW5hdi1wYWRkaW5nLWlubGluZS1zdGFydDogMTZweDtcbiAgICAtLW5hdi1wYWRkaW5nLWlubGluZS1lbmQ6IDE2cHg7XG4gICAgLS1uYXYtcGFkZGluZy1ibG9jay1zdGFydDogdmFyKC0tYXBwLWhlYWRlci1oZWlnaHQpO1xuICAgIC0tbmF2LXBhZGRpbmctYmxvY2stZW5kOiAxNnB4O1xuXG4gICAgW2Rpcj0ncnRsJ10gJiB7XG4gICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XG4gICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLXNpZGViYXItYm9yZGVyKTtcbiAgICB9XG5cbiAgICAmLS1uYXYtYW5pbWF0ZSB7XG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDE4MG1zIGVhc2U7XG4gICAgfVxuXG4gICAgJi0tbmF2LW9wZW4ge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG5cbiAgICAvLyA9PT09PT09PT09IFNDUk9MTCBDT05UQUlORVIgPT09PT09PT09PVxuICAgICZfX3Njcm9sbCB7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIHBhZGRpbmc6IHZhcigtLW5hdi1wYWRkaW5nLWJsb2NrLXN0YXJ0KSB2YXIoLS1uYXYtcGFkZGluZy1pbmxpbmUtZW5kKVxuICAgICAgICB2YXIoLS1uYXYtcGFkZGluZy1ibG9jay1lbmQpIHZhcigtLW5hdi1wYWRkaW5nLWlubGluZS1zdGFydCk7XG4gICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuXG4gICAgICAvLyBNaW5pbWFsIHNjcm9sbGJhclxuICAgICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgICAgICB3aWR0aDogOHB4O1xuICAgICAgfVxuXG4gICAgICAmOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgfVxuXG4gICAgICAmOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICB9XG5cbiAgICAgICY6aG92ZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtZWxldmF0aW9uLTE1MCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJl9fd3JhcCB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gICAgICBmbGV4LWdyb3c6IDE7XG4gICAgfVxuXG4gICAgLy8gPT09PT09PT09PSBOQVYgTElOSyA9PT09PT09PT09XG4gICAgJl9fbGluayB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMTBweDtcbiAgICAgIHdpZHRoOiBjYWxjKDEwMCUgKyAzMnB4KSAhaW1wb3J0YW50O1xuICAgICAgbWFyZ2luLWxlZnQ6IC0xNnB4ICFpbXBvcnRhbnQ7XG4gICAgICBtYXJnaW4tcmlnaHQ6IC0xNnB4ICFpbXBvcnRhbnQ7XG4gICAgICBwYWRkaW5nOiA3cHggMjhweCAhaW1wb3J0YW50O1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gICAgICBjb2xvcjogdmFyKC0tc2lkZWJhci10ZXh0KTtcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHRyYW5zaXRpb246XG4gICAgICAgIGJhY2tncm91bmQtY29sb3IgMTAwbXMgZWFzZSxcbiAgICAgICAgY29sb3IgMTAwbXMgZWFzZTtcblxuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXNpZGViYXItYWNjZW50KTtcbiAgICAgICAgY29sb3I6IHZhcigtLXNpZGViYXItdGV4dC1ob3Zlcik7XG5cbiAgICAgICAgLm5hdl9fbGluay1pY29uIHtcbiAgICAgICAgICBjb2xvcjogdmFyKC0tc2lkZWJhci10ZXh0LWhvdmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAmOmZvY3VzLXZpc2libGUge1xuICAgICAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGhlbWUtZWxldmF0aW9uLTMwMCk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAtMnB4O1xuICAgICAgfVxuXG4gICAgICAvLyBBY3RpdmUgc3RhdGVcbiAgICAgICYtLWFjdGl2ZSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXNpZGViYXItYWNjZW50KTtcbiAgICAgICAgY29sb3I6IHZhcigtLXNpZGViYXItdGV4dC1hY3RpdmUpO1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuXG4gICAgICAgIC5uYXZfX2xpbmstaWNvbiB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLXNpZGViYXItaWNvbi1hY3RpdmUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWNvbiBzdHlsZXNcbiAgICAmX19saW5rLWljb24ge1xuICAgICAgd2lkdGg6IDE2cHg7XG4gICAgICBoZWlnaHQ6IDE2cHg7XG4gICAgICBmbGV4LXNocmluazogMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1zaWRlYmFyLWljb24pO1xuICAgICAgdHJhbnNpdGlvbjogY29sb3IgMTAwbXMgZWFzZTtcbiAgICB9XG5cbiAgICAvLyBFeHRlcm5hbCBsaW5rIGljb24gKHNtYWxsIGluZGljYXRvcilcbiAgICAmX19saW5rLWV4dGVybmFsLWljb24ge1xuICAgICAgd2lkdGg6IDEycHg7XG4gICAgICBoZWlnaHQ6IDEycHg7XG4gICAgICBmbGV4LXNocmluazogMDtcbiAgICAgIGNvbG9yOiB2YXIoLS10aGVtZS1lbGV2YXRpb24tNDAwKTtcbiAgICAgIG1hcmdpbi1sZWZ0OiAtNHB4O1xuICAgICAgb3BhY2l0eTogMC43O1xuICAgIH1cblxuICAgICZfX2xpbmstbGFiZWwge1xuICAgICAgZmxleDogMTtcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgfVxuXG4gICAgLy8gRXh0ZXJuYWwgbGluayBzdHlsaW5nXG4gICAgJl9fbGluay0tZXh0ZXJuYWwge1xuICAgICAgLm5hdl9fbGluay1sYWJlbCB7XG4gICAgICAgIC8vIFNsaWdodGx5IGRpZmZlcmVudCBzdHlsaW5nIGZvciBleHRlcm5hbCBsaW5rc1xuICAgICAgfVxuXG4gICAgICAmOmhvdmVyIC5uYXZfX2xpbmstZXh0ZXJuYWwtaWNvbiB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1zaWRlYmFyLXRleHQtaG92ZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vID09PT09PT09PT0gQkFER0UgU1RZTEVTID09PT09PT09PT1cbiAgICAmX19saW5rLWJhZGdlIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgbWluLXdpZHRoOiAxOHB4O1xuICAgICAgaGVpZ2h0OiAxOHB4O1xuICAgICAgcGFkZGluZzogMCA1cHg7XG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgIG1hcmdpbi1yaWdodDogMjRweDsgLy8gU3BhY2UgZm9yIHBpbiBidXR0b25cbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBib3JkZXItcmFkaXVzOiA5cHg7XG4gICAgICBmbGV4LXNocmluazogMDtcbiAgICAgIC8vIENyaXNwIHJlbmRlcmluZ1xuICAgICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gICAgICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICAgICAgdGV4dC1yZW5kZXJpbmc6IGdlb21ldHJpY1ByZWNpc2lvbjtcbiAgICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTsgLy8gRm9yY2UgR1BVIGxheWVyIGZvciBjcmlzcCByZW5kZXJpbmdcblxuICAgICAgLy8gRGVmYXVsdCAocmVkKVxuICAgICAgYmFja2dyb3VuZDogdmFyKC0tYmFkZ2UtcmVkLWJnKTtcbiAgICAgIGNvbG9yOiB2YXIoLS1iYWRnZS1yZWQtdGV4dCk7XG5cbiAgICAgIC8vIENvbG9yIHZhcmlhbnRzXG4gICAgICAmLS1yZWQge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWRnZS1yZWQtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0tYmFkZ2UtcmVkLXRleHQpO1xuICAgICAgfVxuXG4gICAgICAmLS15ZWxsb3cge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWRnZS15ZWxsb3ctYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0tYmFkZ2UteWVsbG93LXRleHQpO1xuICAgICAgfVxuXG4gICAgICAmLS1ibHVlIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tYmFkZ2UtYmx1ZS1iZyk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1iYWRnZS1ibHVlLXRleHQpO1xuICAgICAgfVxuXG4gICAgICAmLS1ncmVlbiB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWJhZGdlLWdyZWVuLWJnKTtcbiAgICAgICAgY29sb3I6IHZhcigtLWJhZGdlLWdyZWVuLXRleHQpO1xuICAgICAgfVxuXG4gICAgICAmLS1vcmFuZ2Uge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWRnZS1vcmFuZ2UtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0tYmFkZ2Utb3JhbmdlLXRleHQpO1xuICAgICAgfVxuXG4gICAgICAmLS1ncmF5IHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tYmFkZ2UtZ3JheS1iZyk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1iYWRnZS1ncmF5LXRleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vID09PT09PT09PT0gQ09OVFJPTFMgU0VDVElPTiA9PT09PT09PT09XG4gICAgJl9fY29udHJvbHMge1xuICAgICAgbWFyZ2luLXRvcDogYXV0bztcbiAgICAgIHBhZGRpbmctdG9wOiAxMnB4O1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXNpZGViYXItYm9yZGVyKTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgZ2FwOiAycHg7XG5cbiAgICAgIC5idG4ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBnYXA6IDhweDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIHBhZGRpbmc6IDZweCA4cHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgY29sb3I6IHZhcigtLXNpZGViYXItdGV4dCk7XG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB0cmFuc2l0aW9uOlxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3IgMTAwbXMgZWFzZSxcbiAgICAgICAgICBjb2xvciAxMDBtcyBlYXNlO1xuXG4gICAgICAgICY6aG92ZXIge1xuICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXNpZGViYXItYWNjZW50KTtcbiAgICAgICAgICBjb2xvcjogdmFyKC0tc2lkZWJhci10ZXh0LWhvdmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN2ZyB7XG4gICAgICAgICAgd2lkdGg6IDE2cHg7XG4gICAgICAgICAgaGVpZ2h0OiAxNnB4O1xuICAgICAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1zaWRlYmFyLWljb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gPT09PT09PT09PSBSRVNQT05TSVZFID09PT09PT09PT1cbiAgICBAaW5jbHVkZSBtaWQtYnJlYWsge1xuICAgICAgJl9fc2Nyb2xsIHtcbiAgICAgICAgLS1uYXYtcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDEycHg7XG4gICAgICAgIC0tbmF2LXBhZGRpbmctaW5saW5lLWVuZDogMTJweDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBAaW5jbHVkZSBzbWFsbC1icmVhayB7XG4gICAgICAmX19zY3JvbGwge1xuICAgICAgICAtLW5hdi1wYWRkaW5nLWlubGluZS1zdGFydDogdmFyKC0tZ3V0dGVyLWgpO1xuICAgICAgICAtLW5hdi1wYWRkaW5nLWlubGluZS1lbmQ6IHZhcigtLWd1dHRlci1oKTtcbiAgICAgIH1cblxuICAgICAgJl9fbGluayB7XG4gICAgICAgIHBhZGRpbmc6IDhweCAxMnB4O1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gPT09PT09PT09PSBQSU5ORUQgU0VDVElPTiA9PT09PT09PT09XG4gICAgJl9fcGlubmVkLXNlY3Rpb24ge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICAgIHBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXNpZGViYXItYm9yZGVyKTtcbiAgICB9XG5cbiAgICAmX19waW5uZWQtaGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA2cHg7XG4gICAgICBwYWRkaW5nOiA2cHggMTJweDtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcbiAgICAgIGNvbG9yOiB2YXIoLS10aGVtZS1lbGV2YXRpb24tNTAwKTtcblxuICAgICAgc3ZnIHtcbiAgICAgICAgd2lkdGg6IDEycHg7XG4gICAgICAgIGhlaWdodDogMTJweDtcbiAgICAgICAgY29sb3I6IHZhcigtLXRoZW1lLWVsZXZhdGlvbi00MDApO1xuICAgICAgfVxuICAgIH1cblxuICAgICZfX3Bpbm5lZC1pdGVtcyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGdhcDogMnB4O1xuICAgIH1cblxuICAgICZfX3Bpbm5lZC1pdGVtIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgICAubmF2X19saW5rIHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMzZweCAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgIH1cblxuICAgICZfX3VucGluLWJ0biB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICByaWdodDogMTZweDtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIHdpZHRoOiAyNHB4O1xuICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgcGFkZGluZzogMDtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgY29sb3I6IHZhcigtLXRoZW1lLWVsZXZhdGlvbi00MDApO1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAxMDBtcyBlYXNlO1xuXG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtZWxldmF0aW9uLTE1MCk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS10aGVtZS1lcnJvci01MDApO1xuICAgICAgfVxuICAgIH1cblxuICAgICZfX3Bpbm5lZC1pdGVtOmhvdmVyICZfX3VucGluLWJ0biB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cblxuICAgIC8vID09PT09PT09PT0gUElOIEJVVFRPTiBJTiBOQVYgTElOSyA9PT09PT09PT09XG4gICAgJl9fbGluay13cmFwcGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgICAubmF2X19saW5rIHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMzZweCAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgIH1cblxuICAgICZfX3Bpbi1idG4ge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgcmlnaHQ6IDE2cHg7XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICB3aWR0aDogMjRweDtcbiAgICAgIGhlaWdodDogMjRweDtcbiAgICAgIHBhZGRpbmc6IDA7XG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGNvbG9yOiB2YXIoLS10aGVtZS1lbGV2YXRpb24tNDAwKTtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMTAwbXMgZWFzZTtcblxuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWVsZXZhdGlvbi0xNTApO1xuICAgICAgICBjb2xvcjogdmFyKC0tdGhlbWUtZWxldmF0aW9uLTgwMCk7XG4gICAgICB9XG5cbiAgICAgICYtLXBpbm5lZCB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS10aGVtZS1zdWNjZXNzLTUwMCk7XG5cbiAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLXRoZW1lLXN1Y2Nlc3MtNjAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgICZfX2xpbmstd3JhcHBlcjpob3ZlciAmX19waW4tYnRuIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuXG4gICAgJl9fcGluLWJ0bi0tcGlubmVkIHtcbiAgICAgIG9wYWNpdHk6IDAuNztcbiAgICB9XG5cbiAgICAmX19saW5rLXdyYXBwZXI6aG92ZXIgJl9fcGluLWJ0bi0tcGlubmVkIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICB9XG5cbiAgLy8gPT09PT09PT09PSBOQVYgR1JPVVAgLSBGb2xkZXIgc3R5bGUgPT09PT09PT09PVxuICAubmF2LWdyb3VwIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuXG4gICAgLy8gRm9sZGVyIGhlYWRlclxuICAgICZfX3RvZ2dsZSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgcGFkZGluZzogOHB4IDEycHggIWltcG9ydGFudDtcbiAgICAgIGZvbnQtc2l6ZTogMTFweCAhaW1wb3J0YW50O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMCAhaW1wb3J0YW50O1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XG4gICAgICBjb2xvcjogdmFyKC0tdGhlbWUtZWxldmF0aW9uLTUwMCkgIWltcG9ydGFudDtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gICAgICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgdHJhbnNpdGlvbjpcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvciAxMDBtcyBlYXNlLFxuICAgICAgICBjb2xvciAxMDBtcyBlYXNlO1xuXG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tc2lkZWJhci1hY2NlbnQpICFpbXBvcnRhbnQ7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1zaWRlYmFyLXRleHQtaG92ZXIpICFpbXBvcnRhbnQ7XG4gICAgICB9XG5cbiAgICAgIC8vIEZvbGRlciBjaGV2cm9uXG4gICAgICBzdmcge1xuICAgICAgICB3aWR0aDogMTJweCAhaW1wb3J0YW50O1xuICAgICAgICBoZWlnaHQ6IDEycHggIWltcG9ydGFudDtcbiAgICAgICAgY29sb3I6IHZhcigtLXRoZW1lLWVsZXZhdGlvbi00MDApO1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTUwbXMgZWFzZTtcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJl9fY29udGVudCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGdhcDogMnB4O1xuICAgICAgcGFkZGluZy1sZWZ0OiAwICFpbXBvcnRhbnQ7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuXG4gICAgLy8gQ29sbGFwc2VkIGZvbGRlclxuICAgICYtLWNvbGxhcHNlZCB7XG4gICAgICAubmF2LWdyb3VwX190b2dnbGUgc3ZnIHtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyA9PT09PT09PT09IENPTExBUFNJQkxFID09PT09PT09PT1cbiAgLmNvbGxhcHNpYmxlIHtcbiAgICAmX190b2dnbGUge1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4ICFpbXBvcnRhbnQ7XG4gICAgfVxuICB9XG4iXX0= */`;

// src/components/CustomNav/StyleInjector.tsx
var STYLE_ID = "payload-sidebar-plugin-styles";
function StyleInjector() {
  useLayoutEffect(() => {
    if (document.getElementById(STYLE_ID)) {
      return;
    }
    const styleElement = document.createElement("style");
    styleElement.id = STYLE_ID;
    styleElement.textContent = styles_default;
    document.head.appendChild(styleElement);
    return () => {
      const el = document.getElementById(STYLE_ID);
      if (el) el.remove();
    };
  }, []);
  return null;
}
__name(StyleInjector, "StyleInjector");

// src/components/CustomNav/NavContent.tsx
import React3 from "react";
import { NavGroup } from "@payloadcms/ui";
import { formatAdminURL } from "@payloadcms/ui/shared";

// src/components/CustomNav/NavLink.tsx
import { usePathname } from "next/navigation";
import Link2 from "next/link";
import { Pin, Check as Check2, ExternalLink as ExternalLink2 } from "lucide-react";

// src/components/DynamicIcon.tsx
import { memo } from "react";
import {
  File,
  FileText,
  FilePen,
  Files,
  Folder,
  FolderTree,
  FolderOpen,
  User,
  Users,
  UsersRound,
  UserRound,
  UserCheck,
  UserPlus,
  Contact,
  Image,
  Images,
  Video,
  Music,
  Camera,
  Layout,
  LayoutDashboard,
  PanelTop,
  PanelBottom,
  PanelLeft,
  PanelRight,
  Menu,
  Mail,
  MailCheck,
  MessageSquare,
  MessageCircle,
  Send,
  Inbox,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Receipt,
  Package,
  Settings,
  Cog,
  Wrench,
  Shield,
  ShieldCheck,
  Lock,
  Key,
  Plus,
  Minus,
  Edit,
  Trash,
  Trash2,
  Save,
  Download,
  Upload,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  CornerUpRight,
  ExternalLink,
  Link,
  Check,
  X,
  AlertCircle,
  Info,
  HelpCircle,
  BarChart,
  BarChart2,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Calendar,
  Clock,
  Timer,
  Building,
  Building2,
  Home,
  Map,
  MapPin,
  Globe,
  Heart,
  Star,
  ThumbsUp,
  Share,
  Share2,
  Code,
  FileCode,
  Terminal,
  Database,
  Server,
  Cpu,
  ClipboardList,
  ClipboardCheck,
  FormInput,
  ListChecks,
  Search,
  Filter,
  SlidersHorizontal,
  Book,
  BookOpen,
  Bookmark,
  FileArchive,
  Tag,
  Tags,
  Hash,
  Zap,
  Rocket,
  Palette,
  Handshake,
  Award,
  Crown,
  Gift,
  Sparkles,
  Lightbulb,
  Github,
  Circle
} from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var DEFAULT_ICON_MAP = {
  // Content
  "file": File,
  "file-text": FileText,
  "file-pen": FilePen,
  "files": Files,
  "folder": Folder,
  "folder-tree": FolderTree,
  "folder-open": FolderOpen,
  // Users
  "user": User,
  "users": Users,
  "users-round": UsersRound,
  "user-round": UserRound,
  "user-check": UserCheck,
  "user-plus": UserPlus,
  "contact": Contact,
  // Media
  "image": Image,
  "images": Images,
  "video": Video,
  "music": Music,
  "camera": Camera,
  // Layout
  "layout": Layout,
  "layout-dashboard": LayoutDashboard,
  "panel-top": PanelTop,
  "panel-bottom": PanelBottom,
  "panel-left": PanelLeft,
  "panel-right": PanelRight,
  "menu": Menu,
  // Communication
  "mail": Mail,
  "mail-check": MailCheck,
  "message-square": MessageSquare,
  "message-circle": MessageCircle,
  "send": Send,
  "inbox": Inbox,
  // E-commerce
  "shopping-bag": ShoppingBag,
  "shopping-cart": ShoppingCart,
  "credit-card": CreditCard,
  "dollar-sign": DollarSign,
  "receipt": Receipt,
  "package": Package,
  // Settings
  "settings": Settings,
  "cog": Cog,
  "wrench": Wrench,
  "shield": Shield,
  "shield-check": ShieldCheck,
  "lock": Lock,
  "key": Key,
  // Actions
  "plus": Plus,
  "minus": Minus,
  "edit": Edit,
  "trash": Trash,
  "trash-2": Trash2,
  "save": Save,
  "download": Download,
  "upload": Upload,
  // Arrows
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  "arrow-down": ArrowDown,
  "corner-up-right": CornerUpRight,
  "external-link": ExternalLink,
  "link": Link,
  // Status
  "check": Check,
  "x": X,
  "alert-circle": AlertCircle,
  "info": Info,
  "help-circle": HelpCircle,
  // Charts
  "bar-chart": BarChart,
  "bar-chart-2": BarChart2,
  "bar-chart-3": BarChart3,
  "chart": BarChart3,
  // alias
  "line-chart": LineChart,
  "pie-chart": PieChart,
  "activity": Activity,
  // Calendar
  "calendar": Calendar,
  "clock": Clock,
  "timer": Timer,
  // Organization
  "building": Building,
  "building-2": Building2,
  "home": Home,
  "map": Map,
  "map-pin": MapPin,
  "globe": Globe,
  // Social
  "heart": Heart,
  "star": Star,
  "thumbs-up": ThumbsUp,
  "share": Share,
  "share-2": Share2,
  // Development
  "code": Code,
  "file-code": FileCode,
  "terminal": Terminal,
  "database": Database,
  "server": Server,
  "cpu": Cpu,
  // Forms
  "clipboard-list": ClipboardList,
  "clipboard-check": ClipboardCheck,
  "form-input": FormInput,
  "list-checks": ListChecks,
  // Search
  "search": Search,
  "filter": Filter,
  "sliders-horizontal": SlidersHorizontal,
  // Documents
  "book": Book,
  "book-open": BookOpen,
  "bookmark": Bookmark,
  "file-archive": FileArchive,
  // Misc
  "tag": Tag,
  "tags": Tags,
  "hash": Hash,
  "zap": Zap,
  "rocket": Rocket,
  "palette": Palette,
  "handshake": Handshake,
  "award": Award,
  "crown": Crown,
  "gift": Gift,
  "sparkles": Sparkles,
  "lightbulb": Lightbulb,
  "github": Github,
  // Default
  "circle": Circle
};
var FallbackIcon = /* @__PURE__ */ __name(({ size = 24, className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: [
      /* @__PURE__ */ jsx("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
      /* @__PURE__ */ jsx("path", { d: "M14 2v4a2 2 0 0 0 2 2h4" })
    ]
  }
), "FallbackIcon");
var DynamicIcon = memo(/* @__PURE__ */ __name(function DynamicIcon2({
  name,
  customIcons,
  fallback,
  ...props
}) {
  const IconComponent = customIcons?.[name] || DEFAULT_ICON_MAP[name];
  if (!IconComponent) {
    if (fallback) {
      return /* @__PURE__ */ jsx(Fragment, { children: fallback });
    }
    return /* @__PURE__ */ jsx(FallbackIcon, { ...props });
  }
  return /* @__PURE__ */ jsx(IconComponent, { ...props });
}, "DynamicIcon"));

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
import { jsx as jsx2 } from "react/jsx-runtime";
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
var NavConfigProvider = /* @__PURE__ */ __name(({ children, config }) => {
  return /* @__PURE__ */ jsx2(NavConfigContext.Provider, { value: config, children });
}, "NavConfigProvider");
var CustomIconContext = createContext({});
var useCustomIcons = /* @__PURE__ */ __name(() => {
  return useContext(CustomIconContext);
}, "useCustomIcons");
var SidebarIconProvider = /* @__PURE__ */ __name(({ children, icons }) => {
  return /* @__PURE__ */ jsx2(CustomIconContext.Provider, { value: icons, children });
}, "SidebarIconProvider");
var BadgeContext = createContext({});
var useBadgeContext = /* @__PURE__ */ __name(() => {
  return useContext(BadgeContext);
}, "useBadgeContext");
var SidebarBadgeProvider = /* @__PURE__ */ __name(({ children, badges }) => {
  return /* @__PURE__ */ jsx2(BadgeContext.Provider, { value: badges, children });
}, "SidebarBadgeProvider");

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
function getBadgeColorClass(color, classPrefix = "nav") {
  return `${classPrefix}__link-badge--${color}`;
}
__name(getBadgeColorClass, "getBadgeColorClass");

// src/components/CustomNav/NavLink.tsx
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var NavLink = /* @__PURE__ */ __name(({
  href,
  id,
  slug,
  type: _type,
  children,
  isPinned = false,
  onTogglePin,
  external = false,
  customIcon
}) => {
  const pathname = usePathname();
  const { icons, classPrefix, enablePinning } = useNavConfig();
  const customIcons = useCustomIcons();
  const badge = useBadge(slug || "");
  const isActive = !external && (pathname === href || pathname.startsWith(`${href}/`));
  const extractedSlug = slug || id.replace("nav-global-", "").replace("nav-custom-", "").replace("nav-", "");
  let iconName = "file";
  if (customIcon) {
    iconName = icons[customIcon] || customIcon;
  } else {
    iconName = icons[extractedSlug] || "file";
  }
  const isExternalLink = external || href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");
  const linkContent = /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx3(
      DynamicIcon,
      {
        name: iconName,
        customIcons,
        className: `${classPrefix}__link-icon`,
        size: 18
      }
    ),
    children,
    isExternalLink && /* @__PURE__ */ jsx3(ExternalLink2, { className: `${classPrefix}__link-external-icon`, size: 12 }),
    badge && /* @__PURE__ */ jsx3(
      "span",
      {
        className: `${classPrefix}__link-badge ${getBadgeColorClass(badge.color, classPrefix)}`,
        children: badge.count > 99 ? "99+" : badge.count
      }
    )
  ] });
  return /* @__PURE__ */ jsxs2("div", { className: `${classPrefix}__link-wrapper`, children: [
    isExternalLink ? /* @__PURE__ */ jsx3(
      "a",
      {
        className: `${classPrefix}__link ${classPrefix}__link--external`,
        href,
        id,
        target: "_blank",
        rel: "noopener noreferrer",
        children: linkContent
      }
    ) : /* @__PURE__ */ jsx3(
      Link2,
      {
        className: `${classPrefix}__link${isActive ? ` ${classPrefix}__link--active` : ""}`,
        href,
        id,
        "aria-current": isActive ? "page" : void 0,
        children: linkContent
      }
    ),
    enablePinning && onTogglePin && /* @__PURE__ */ jsx3(
      "button",
      {
        className: `${classPrefix}__pin-btn${isPinned ? ` ${classPrefix}__pin-btn--pinned` : ""}`,
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          onTogglePin();
        },
        title: isPinned ? "Pinned" : "Pin to top",
        type: "button",
        children: isPinned ? /* @__PURE__ */ jsx3(Check2, { size: 14 }) : /* @__PURE__ */ jsx3(Pin, { size: 14 })
      }
    )
  ] });
}, "NavLink");

// src/components/CustomNav/PinnedSection.tsx
import { Pin as Pin2, X as X2, ExternalLink as ExternalLink3 } from "lucide-react";
import Link3 from "next/link";
import { usePathname as usePathname2 } from "next/navigation";
import { Fragment as Fragment3, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var PinnedItemLink = /* @__PURE__ */ __name(({ item, onUnpin, classPrefix, icons }) => {
  const pathname = usePathname2();
  const badge = useBadge(item.slug);
  const customIcons = useCustomIcons();
  const isExternalLink = item.external || item.href.startsWith("http://") || item.href.startsWith("https://") || item.href.startsWith("//");
  const isActive = !isExternalLink && (pathname === item.href || pathname.startsWith(`${item.href}/`));
  let iconName = "file";
  if (item.icon) {
    iconName = icons[item.icon] || item.icon;
  } else {
    iconName = icons[item.slug] || "file";
  }
  const linkContent = /* @__PURE__ */ jsxs3(Fragment3, { children: [
    /* @__PURE__ */ jsx4(
      DynamicIcon,
      {
        name: iconName,
        customIcons,
        className: `${classPrefix}__link-icon`,
        size: 18
      }
    ),
    /* @__PURE__ */ jsx4("span", { className: `${classPrefix}__link-label`, children: item.label }),
    isExternalLink && /* @__PURE__ */ jsx4(ExternalLink3, { className: `${classPrefix}__link-external-icon`, size: 12 }),
    badge && /* @__PURE__ */ jsx4(
      "span",
      {
        className: `${classPrefix}__link-badge ${getBadgeColorClass(badge.color, classPrefix)}`,
        children: badge.count > 99 ? "99+" : badge.count
      }
    )
  ] });
  return /* @__PURE__ */ jsxs3("div", { className: `${classPrefix}__pinned-item`, children: [
    isExternalLink ? /* @__PURE__ */ jsx4(
      "a",
      {
        href: item.href,
        className: `${classPrefix}__link ${classPrefix}__link--external`,
        id: `nav-pinned-${item.slug}`,
        target: "_blank",
        rel: "noopener noreferrer",
        children: linkContent
      }
    ) : /* @__PURE__ */ jsx4(
      Link3,
      {
        href: item.href,
        className: `${classPrefix}__link${isActive ? ` ${classPrefix}__link--active` : ""}`,
        id: `nav-pinned-${item.slug}`,
        children: linkContent
      }
    ),
    /* @__PURE__ */ jsx4(
      "button",
      {
        className: `${classPrefix}__unpin-btn`,
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          onUnpin(item.slug, item.type);
        },
        title: "Unpin",
        type: "button",
        children: /* @__PURE__ */ jsx4(X2, { size: 14 })
      }
    )
  ] });
}, "PinnedItemLink");
var PinnedSection = /* @__PURE__ */ __name(({ items, onUnpin }) => {
  const { icons, classPrefix } = useNavConfig();
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsxs3("div", { className: `${classPrefix}__pinned-section`, children: [
    /* @__PURE__ */ jsxs3("div", { className: `${classPrefix}__pinned-header`, children: [
      /* @__PURE__ */ jsx4(Pin2, { size: 12 }),
      /* @__PURE__ */ jsx4("span", { children: "Pinned" })
    ] }),
    /* @__PURE__ */ jsx4("div", { className: `${classPrefix}__pinned-items`, children: items.map((item) => /* @__PURE__ */ jsx4(
      PinnedItemLink,
      {
        item,
        onUnpin,
        classPrefix,
        icons
      },
      `${item.type}-${item.slug}`
    )) })
  ] });
}, "PinnedSection");

// src/hooks/usePinnedNav.ts
import { useState, useEffect, useCallback } from "react";
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

// src/components/CustomNav/NavContent.tsx
import { Fragment as Fragment4, jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var NavContent = /* @__PURE__ */ __name(({ groups, adminRoute, navPreferences }) => {
  const { pinnedItems, isPinned, togglePin, unpinItem, loading } = usePinnedNav();
  const { classPrefix, enablePinning } = useNavConfig();
  const pinnedNavItems = React3.useMemo(() => {
    return pinnedItems.map((item) => {
      for (const group of groups) {
        const entity = group.entities.find((e) => e.slug === item.slug && e.type === item.type);
        if (entity) {
          let href;
          if (item.type === "custom" && entity.href) {
            href = entity.href;
          } else if (item.type === "collection") {
            href = formatAdminURL({ adminRoute, path: `/collections/${item.slug}` });
          } else {
            href = formatAdminURL({ adminRoute, path: `/globals/${item.slug}` });
          }
          return {
            ...item,
            label: entity.label,
            href,
            external: entity.external,
            icon: entity.icon
          };
        }
      }
      return null;
    }).filter(Boolean);
  }, [pinnedItems, groups, adminRoute]);
  return /* @__PURE__ */ jsxs4(Fragment4, { children: [
    /* @__PURE__ */ jsx5(NavLink, { href: formatAdminURL({ adminRoute, path: "" }), id: "nav-dashboard", slug: "dashboard", children: "Dashboard" }),
    enablePinning && !loading && pinnedNavItems.length > 0 && /* @__PURE__ */ jsx5(PinnedSection, { items: pinnedNavItems, onUnpin: unpinItem }),
    groups.map(({ entities, label }, groupIndex) => /* @__PURE__ */ jsx5(NavGroup, { isOpen: navPreferences?.groups?.[label]?.open, label, children: entities.map((entity, entityIndex) => {
      const { slug, type, label: entityLabel, href: customHref, external, icon, pinnable } = entity;
      let href;
      if (type === "custom" && customHref) {
        href = customHref;
      } else if (type === "collection") {
        href = formatAdminURL({ adminRoute, path: `/collections/${slug}` });
      } else {
        href = formatAdminURL({ adminRoute, path: `/globals/${slug}` });
      }
      const id = type === "collection" ? `nav-${slug}` : type === "global" ? `nav-global-${slug}` : `nav-custom-${slug}`;
      const pinned = isPinned(slug, type);
      const canPin = enablePinning && pinnable !== false;
      return /* @__PURE__ */ jsx5(
        NavLink,
        {
          href,
          id,
          slug,
          type,
          isPinned: pinned,
          onTogglePin: canPin ? () => togglePin(slug, type) : void 0,
          external,
          customIcon: icon,
          children: /* @__PURE__ */ jsx5("span", { className: `${classPrefix}__link-label`, children: entityLabel })
        },
        entityIndex
      );
    }) }, groupIndex))
  ] });
}, "NavContent");

// src/components/CustomNav/index.client.tsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var CustomNavClient = /* @__PURE__ */ __name((props) => {
  const {
    classPrefix = "nav",
    groups,
    adminRoute,
    navPreferences,
    navConfig,
    beforeNav,
    beforeNavLinks,
    afterNavLinks,
    afterNav,
    logoutComponent
  } = props;
  const { hydrated, navOpen, navRef, shouldAnimate } = useNav();
  const mergedIcons = {
    ...DEFAULT_ICONS,
    ...navConfig.icons || {}
  };
  const fullConfig = {
    icons: mergedIcons,
    classPrefix: navConfig.classPrefix,
    enablePinning: navConfig.enablePinning,
    pinnedStorage: navConfig.pinnedStorage,
    cssVariables: navConfig.cssVariables,
    customLinks: navConfig.customLinks
  };
  return /* @__PURE__ */ jsxs5(NavConfigProvider, { config: fullConfig, children: [
    /* @__PURE__ */ jsx6(StyleInjector, {}),
    /* @__PURE__ */ jsx6(
      "aside",
      {
        className: [
          classPrefix,
          navOpen && `${classPrefix}--nav-open`,
          shouldAnimate && `${classPrefix}--nav-animate`,
          hydrated && `${classPrefix}--nav-hydrated`
        ].filter(Boolean).join(" "),
        ...!navOpen ? { inert: true } : {},
        children: /* @__PURE__ */ jsxs5("div", { className: `${classPrefix}__scroll`, ref: navRef, children: [
          beforeNav,
          /* @__PURE__ */ jsxs5("nav", { className: `${classPrefix}__wrap`, children: [
            beforeNavLinks,
            /* @__PURE__ */ jsx6(
              NavContent,
              {
                groups,
                adminRoute,
                navPreferences
              }
            ),
            afterNavLinks,
            /* @__PURE__ */ jsx6("div", { className: `${classPrefix}__controls`, children: logoutComponent })
          ] }),
          afterNav
        ] })
      }
    )
  ] });
}, "CustomNavClient");
export {
  BadgeContext,
  CustomIconContext,
  CustomNavClient,
  DEFAULT_ICON_MAP,
  DynamicIcon,
  NavConfigContext,
  NavConfigProvider,
  NavContent,
  NavLink,
  PinnedSection,
  SidebarBadgeProvider,
  SidebarIconProvider,
  useBadgeContext,
  useCustomIcons,
  useNavConfig
};
//# sourceMappingURL=index.js.map