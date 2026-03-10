import {
  signal,
  ɵɵdefineInjectable
} from "./chunk-5TIXBMSX.js";

// src/app/core/services/theme.service.ts
var ThemeService = class _ThemeService {
  isDark = signal(this.getStoredTheme());
  constructor() {
    this.applyTheme();
  }
  toggle() {
    this.isDark.set(!this.isDark());
    this.applyTheme();
    localStorage.setItem("om_theme", this.isDark() ? "dark" : "light");
  }
  getStoredTheme() {
    return localStorage.getItem("om_theme") === "dark";
  }
  applyTheme() {
    if (this.isDark()) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }
  static \u0275fac = function ThemeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ThemeService, factory: _ThemeService.\u0275fac, providedIn: "root" });
};

export {
  ThemeService
};
//# sourceMappingURL=chunk-6XBCQS5R.js.map
