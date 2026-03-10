import {
  __spreadProps,
  __spreadValues,
  computed,
  effect,
  signal,
  ɵɵdefineInjectable
} from "./chunk-5TIXBMSX.js";

// src/app/core/services/cart.service.ts
var CART_STORAGE_KEY = "om_cart";
var CartService = class _CartService {
  cartItems = signal(this.loadCart());
  constructor() {
    effect(() => {
      const items = this.cartItems();
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    });
  }
  loadCart() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  itemCount = computed(() => this.cartItems().reduce((sum, ci) => sum + ci.quantity, 0));
  subtotal = computed(() => this.cartItems().reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0));
  vatAmount = computed(() => this.cartItems().reduce((sum, ci) => sum + ci.item.price * ci.item.vatPercentage / 100 * ci.quantity, 0));
  grandTotal = computed(() => this.subtotal() + this.vatAmount());
  addItem(item) {
    const items = this.cartItems();
    const existing = items.find((i) => i.item.id === item.id);
    if (existing) {
      this.cartItems.set(items.map((i) => i.item.id === item.id ? __spreadProps(__spreadValues({}, i), { quantity: i.quantity + 1 }) : i));
    } else {
      this.cartItems.set([...items, { item, quantity: 1 }]);
    }
  }
  removeItem(itemId) {
    this.cartItems.set(this.cartItems().filter((ci) => ci.item.id !== itemId));
  }
  updateQuantity(itemId, quantity) {
    if (quantity < 1) {
      this.removeItem(itemId);
      return;
    }
    this.cartItems.set(this.cartItems().map((i) => i.item.id === itemId ? __spreadProps(__spreadValues({}, i), { quantity }) : i));
  }
  clearCart() {
    this.cartItems.set([]);
  }
  static \u0275fac = function CartService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CartService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CartService, factory: _CartService.\u0275fac, providedIn: "root" });
};

export {
  CartService
};
//# sourceMappingURL=chunk-MZ6CBEQ5.js.map
