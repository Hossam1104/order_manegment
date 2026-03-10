import {
  MatDivider,
  MatDividerModule
} from "./chunk-RLZ7PKVH.js";
import {
  UIAnimations
} from "./chunk-APV7DXHN.js";
import {
  ConfirmDialogComponent,
  MatFormFieldModule,
  MatInputModule
} from "./chunk-ZAZ4I723.js";
import {
  MatSnackBar
} from "./chunk-XS5QB7N3.js";
import {
  ItemService,
  MatDialog
} from "./chunk-SEC6B5R6.js";
import {
  CartService
} from "./chunk-MZ6CBEQ5.js";
import {
  MatCard,
  MatCardModule
} from "./chunk-BPTDJG5M.js";
import {
  MatTooltip,
  MatTooltipModule,
  RouterLink
} from "./chunk-LH33S5DA.js";
import {
  Dir,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  TranslateModule,
  TranslatePipe,
  TranslateService
} from "./chunk-YDAIAYGZ.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-5TIXBMSX.js";

// src/app/features/cart/cart-page/cart-page.component.ts
var _forTrack0 = ($index, $item) => $item.item.id;
function CartPageComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r0.cartService.itemCount(), " ", \u0275\u0275pipeBind1(2, 2, "CART.ITEMS_COUNT"), "");
  }
}
function CartPageComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function CartPageComponent_Conditional_40_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.clearCart());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "remove_shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 20);
    \u0275\u0275listener("click", function CartPageComponent_Conditional_40_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.printInvoice());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "print");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 2, "CART.CLEAR"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(9, 4, "CART.PRINT_INVOICE"), " ");
  }
}
function CartPageComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 21)(2, "mat-icon");
    \u0275\u0275text(3, "shopping_cart");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 22);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 23);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 3, "CART.EMPTY"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 5, "CART.EMPTY_HINT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 7, "CART.CONTINUE_SHOPPING"));
  }
}
function CartPageComponent_Conditional_44_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 25);
    \u0275\u0275element(2, "img", 32);
    \u0275\u0275elementStart(3, "div", 33)(4, "span", 34);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 35);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 36)(9, "span", 37);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275element(12, "span", 38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 39)(14, "div", 40)(15, "button", 41);
    \u0275\u0275listener("click", function CartPageComponent_Conditional_44_For_16_Template_button_click_15_listener() {
      const cartItem_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.decrementQty(cartItem_r4));
    });
    \u0275\u0275elementStart(16, "mat-icon");
    \u0275\u0275text(17, "remove");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "input", 42);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275listener("change", function CartPageComponent_Conditional_44_For_16_Template_input_change_18_listener($event) {
      const cartItem_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onQtyChange(cartItem_r4, $event.target.valueAsNumber));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 43);
    \u0275\u0275listener("click", function CartPageComponent_Conditional_44_For_16_Template_button_click_20_listener() {
      const cartItem_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.incrementQty(cartItem_r4));
    });
    \u0275\u0275elementStart(21, "mat-icon");
    \u0275\u0275text(22, "add");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "span", 44);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 45)(26, "span", 46);
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "number");
    \u0275\u0275element(29, "span", 38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 29)(31, "button", 47);
    \u0275\u0275pipe(32, "translate");
    \u0275\u0275listener("click", function CartPageComponent_Conditional_44_For_16_Template_button_click_31_listener() {
      const cartItem_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.removeItem(cartItem_r4));
    });
    \u0275\u0275elementStart(33, "mat-icon");
    \u0275\u0275text(34, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const cartItem_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r0.getImageUrl(cartItem_r4) || "assets/placeholder-image.png", \u0275\u0275sanitizeUrl)("alt", ctx_r0.getItemName(cartItem_r4));
    \u0275\u0275attribute("title", ctx_r0.getItemName(cartItem_r4));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.getItemName(cartItem_r4));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("SKU: ", cartItem_r4.item.itemCode, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(11, 12, cartItem_r4.item.price, "1.2-2"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", cartItem_r4.quantity <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", cartItem_r4.quantity);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(19, 15, "CART.QUANTITY"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", cartItem_r4.quantity, "x");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(28, 17, (cartItem_r4.item.price + cartItem_r4.item.price * cartItem_r4.item.vatPercentage / 100) * cartItem_r4.quantity, "1.2-2"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("matTooltip", \u0275\u0275pipeBind1(32, 20, "CART.REMOVE"));
  }
}
function CartPageComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 26);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 27);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 28);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "div", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 30);
    \u0275\u0275repeaterCreate(15, CartPageComponent_Conditional_44_For_16_Template, 35, 22, "div", 31, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 5, "CART.PRODUCT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 7, "CART.UNIT_PRICE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 9, "CART.QUANTITY"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 11, "CART.LINE_TOTAL"));
    \u0275\u0275advance(3);
    \u0275\u0275property("@listAnimation", ctx_r0.cartService.cartItems().length);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.cartService.cartItems());
  }
}
function CartPageComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 18)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 48)(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275element(12, "span", 38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 48)(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "number");
    \u0275\u0275element(20, "span", 38);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(21, "mat-divider", 49);
    \u0275\u0275elementStart(22, "div", 50)(23, "span");
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "number");
    \u0275\u0275element(29, "span", 51);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 9, "CART.ORDER_SUMMARY"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3("", \u0275\u0275pipeBind1(7, 11, "CART.SUBTOTAL"), " (", ctx_r0.cartService.itemCount(), " ", \u0275\u0275pipeBind1(8, 13, "CART.ITEMS_COUNT"), ")");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(11, 15, ctx_r0.cartService.subtotal(), "1.2-2"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 18, "CART.VAT_AMOUNT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(19, 20, ctx_r0.cartService.vatAmount(), "1.2-2"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(25, 23, "CART.GRAND_TOTAL"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(28, 25, ctx_r0.cartService.grandTotal(), "1.2-2"), " ");
  }
}
var CartPageComponent = class _CartPageComponent {
  cartService = inject(CartService);
  itemService = inject(ItemService);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  translate = inject(TranslateService);
  currentDate = /* @__PURE__ */ new Date();
  get currentLang() {
    return this.translate.currentLang || "en";
  }
  getItemName(cartItem) {
    return this.currentLang === "ar" ? cartItem.item.nameAR : cartItem.item.nameEN;
  }
  onQtyChange(cartItem, value) {
    this.cartService.updateQuantity(cartItem.item.id, value);
  }
  incrementQty(cartItem) {
    this.onQtyChange(cartItem, cartItem.quantity + 1);
  }
  decrementQty(cartItem) {
    this.onQtyChange(cartItem, cartItem.quantity - 1);
  }
  removeItem(cartItem) {
    this.cartService.removeItem(cartItem.item.id);
  }
  clearCart() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px",
      data: {
        title: this.translate.instant("CART.CLEAR"),
        message: this.translate.instant("CART.CLEAR") + "?"
      }
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.cartService.clearCart();
      }
    });
  }
  getImageUrl(cartItem) {
    return this.itemService.getImageUrl(cartItem.item.imagePath);
  }
  printInvoice() {
    window.print();
  }
  static \u0275fac = function CartPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CartPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CartPageComponent, selectors: [["app-cart-page"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 46, vars: 32, consts: [[1, "cart-page-container", 3, "dir"], [1, "print-header", "hidden-screen"], [1, "invoice-brand"], [1, "invoice-logo"], [1, "invoice-details"], [1, "meta-grid"], [1, "meta-item"], [1, "meta-label"], [1, "meta-value"], [1, "page-header", "hidden-print"], [1, "title-wrapper"], ["mat-icon-button", "", "routerLink", "/", 1, "back-btn", 3, "matTooltip"], [1, "page-icon"], [1, "badge"], [1, "header-actions"], [1, "cart-content"], ["appearance", "outlined", 1, "cart-items-card"], [1, "empty-state", "hidden-print"], ["appearance", "outlined", 1, "order-summary-card"], ["mat-stroked-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "empty-illustration"], [1, "text-muted"], ["mat-stroked-button", "", "routerLink", "/"], [1, "cart-table-header", "text-muted"], [1, "col-product"], [1, "col-price"], [1, "col-qty"], [1, "col-total"], [1, "col-action", "hidden-print"], [1, "cart-items-list"], [1, "cart-row"], ["title", "Product image", 1, "item-visual", "hidden-print", 3, "src", "alt"], [1, "item-meta"], [1, "item-name"], [1, "item-code", "text-muted"], ["data-label", "Unit Price", 1, "col-price"], [1, "price-value"], [1, "sar-icon"], ["data-label", "Quantity", 1, "col-qty"], [1, "qty-stepper", "hidden-print"], ["type", "button", 1, "qty-btn", 3, "click", "disabled"], ["type", "number", "min", "1", "title", "Quantity", "placeholder", "Qty", 1, "qty-input", 3, "change", "value"], ["type", "button", 1, "qty-btn", 3, "click"], [1, "print-qty", "hidden-screen"], ["data-label", "Total", 1, "col-total"], [1, "total-value"], ["mat-icon-button", "", "color", "warn", 3, "click", "matTooltip"], [1, "summary-line", "text-muted"], [1, "summary-divider"], [1, "summary-line", "grand-total"], [1, "sar-icon", "sar-lg"]], template: function CartPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "mat-icon");
      \u0275\u0275text(5, "store");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "h1");
      \u0275\u0275text(7);
      \u0275\u0275pipe(8, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 4)(10, "div", 5)(11, "div", 6)(12, "span", 7);
      \u0275\u0275text(13);
      \u0275\u0275pipe(14, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span", 8);
      \u0275\u0275text(16);
      \u0275\u0275pipe(17, "date");
      \u0275\u0275pipe(18, "date");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 6)(20, "span", 7);
      \u0275\u0275text(21);
      \u0275\u0275pipe(22, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "span", 8);
      \u0275\u0275text(24);
      \u0275\u0275pipe(25, "date");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(26, "div", 9)(27, "div", 10)(28, "button", 11);
      \u0275\u0275pipe(29, "translate");
      \u0275\u0275elementStart(30, "mat-icon");
      \u0275\u0275text(31, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 12)(33, "mat-icon");
      \u0275\u0275text(34, "shopping_cart");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "h1");
      \u0275\u0275text(36);
      \u0275\u0275pipe(37, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275template(38, CartPageComponent_Conditional_38_Template, 3, 4, "span", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "div", 14);
      \u0275\u0275template(40, CartPageComponent_Conditional_40_Template, 10, 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "div", 15)(42, "mat-card", 16);
      \u0275\u0275template(43, CartPageComponent_Conditional_43_Template, 13, 9, "div", 17)(44, CartPageComponent_Conditional_44_Template, 17, 13);
      \u0275\u0275elementEnd();
      \u0275\u0275template(45, CartPageComponent_Conditional_45_Template, 30, 28, "mat-card", 18);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("dir", ctx.currentLang === "ar" ? "rtl" : "ltr");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 13, "APP_TITLE"));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 15, "CART.INVOICE_NO"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("INV-", \u0275\u0275pipeBind2(17, 17, ctx.currentDate, "yyMMdd"), "-", \u0275\u0275pipeBind2(18, 20, ctx.currentDate, "HHmm"), "");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 23, "CART.DATE"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(25, 25, ctx.currentDate, "dd MMM yyyy, HH:mm"));
      \u0275\u0275advance(4);
      \u0275\u0275property("matTooltip", \u0275\u0275pipeBind1(29, 28, "NAV.STOREFRONT"));
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(37, 30, "CART.TITLE"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.cartService.itemCount() > 0 ? 38 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.cartService.itemCount() > 0 ? 40 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.cartService.itemCount() === 0 ? 43 : 44);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.cartService.itemCount() > 0 ? 45 : -1);
    }
  }, dependencies: [
    CommonModule,
    DecimalPipe,
    DatePipe,
    MatButtonModule,
    MatButton,
    MatIconButton,
    Dir,
    MatIconModule,
    MatIcon,
    MatCardModule,
    MatCard,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatDivider,
    MatTooltipModule,
    MatTooltip,
    TranslateModule,
    TranslatePipe,
    RouterLink
  ], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.cart-page-container[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  min-height: calc(100vh - 120px);\n  animation: fadeInUp 0.4s ease both;\n}\n.hidden-screen[_ngcontent-%COMP%] {\n  display: none !important;\n}\n.print-header[_ngcontent-%COMP%] {\n  border-bottom: 2px solid var(--color-border);\n  padding-bottom: 32px;\n  margin-bottom: 32px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.print-header[_ngcontent-%COMP%]   .invoice-logo[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 800;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 24px;\n  }\n}\n.page-header[_ngcontent-%COMP%]   .title-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%]   .title-wrapper[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n.page-header[_ngcontent-%COMP%]   .title-wrapper[_ngcontent-%COMP%]   .back-btn[_ngcontent-%COMP%] {\n  margin-right: 16px;\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%]   .title-wrapper[_ngcontent-%COMP%]   .back-btn[_ngcontent-%COMP%] {\n    margin-right: 4px;\n  }\n}\n.page-header[_ngcontent-%COMP%]   .title-wrapper[_ngcontent-%COMP%]   .page-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #635BFF 0%,\n      #0EA5E9 100%);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n}\n.page-header[_ngcontent-%COMP%]   .title-wrapper[_ngcontent-%COMP%]   .page-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.page-header[_ngcontent-%COMP%]   .title-wrapper[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 28px;\n  font-weight: 700;\n  letter-spacing: -0.5px;\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%]   .title-wrapper[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n}\n.page-header[_ngcontent-%COMP%]   .title-wrapper[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  background: rgba(99, 91, 255, 0.08);\n  color: #635BFF;\n  padding: 4px 14px;\n  border-radius: 100px;\n  font-weight: 600;\n  font-size: 13px;\n}\n.page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-wrap: wrap;\n  }\n  .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 140px;\n  }\n}\n.page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  height: 44px;\n  font-weight: 600;\n}\n.page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 6px;\n}\n.cart-content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 380px;\n  gap: 32px;\n  align-items: start;\n}\n@media (max-width: 1024px) {\n  .cart-content[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.cart-items-card[_ngcontent-%COMP%] {\n  padding: 0;\n  border-radius: 16px;\n  overflow: hidden;\n}\n.cart-table-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr 1fr 1fr 48px;\n  padding: 16px 24px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(99, 91, 255, 0.02) 0%,\n      rgba(14, 165, 233, 0.02) 100%);\n  border-bottom: 1px solid var(--color-border);\n  font-weight: 600;\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--color-text-muted);\n}\n@media (max-width: 768px) {\n  .cart-table-header[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.cart-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr 1fr 1fr 48px;\n  align-items: center;\n  padding: 16px 24px;\n  border-bottom: 1px solid var(--color-border);\n  transition: background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media (max-width: 768px) {\n  .cart-row[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: stretch;\n    gap: 16px;\n    padding: 24px;\n  }\n}\n.cart-row[_ngcontent-%COMP%]:hover {\n  background: rgba(99, 91, 255, 0.02);\n}\n.cart-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.cart-row[_ngcontent-%COMP%]   .col-product[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.cart-row[_ngcontent-%COMP%]   .col-product[_ngcontent-%COMP%]   .item-visual[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border-radius: 12px;\n  object-fit: contain;\n  mix-blend-mode: multiply;\n  border: 1px solid var(--color-border);\n  padding: 4px;\n}\n.cart-row[_ngcontent-%COMP%]   .col-product[_ngcontent-%COMP%]   .item-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.cart-row[_ngcontent-%COMP%]   .col-product[_ngcontent-%COMP%]   .item-meta[_ngcontent-%COMP%]   .item-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--color-text-main);\n  font-size: 14px;\n}\n.cart-row[_ngcontent-%COMP%]   .col-product[_ngcontent-%COMP%]   .item-meta[_ngcontent-%COMP%]   .item-code[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-family: "JetBrains Mono", monospace;\n  color: var(--color-text-muted);\n}\n.cart-row[_ngcontent-%COMP%]   .col-price[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n  font-weight: 500;\n  font-size: 14px;\n}\n@media (max-width: 768px) {\n  .cart-row[_ngcontent-%COMP%]   .col-price[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-top: 16px;\n  }\n  .cart-row[_ngcontent-%COMP%]   .col-price[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-transform: uppercase;\n    font-size: 11px;\n  }\n}\n@media (max-width: 768px) {\n  .cart-row[_ngcontent-%COMP%]   .col-qty[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-top: 16px;\n  }\n  .cart-row[_ngcontent-%COMP%]   .col-qty[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-transform: uppercase;\n    font-size: 11px;\n    color: var(--color-text-muted);\n  }\n}\n.cart-row[_ngcontent-%COMP%]   .col-total[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 15px;\n  color: var(--color-primary);\n}\n@media (max-width: 768px) {\n  .cart-row[_ngcontent-%COMP%]   .col-total[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-top: 16px;\n    padding-top: 16px;\n    border-top: 1px dashed var(--color-border);\n  }\n  .cart-row[_ngcontent-%COMP%]   .col-total[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-transform: uppercase;\n    font-size: 11px;\n    color: var(--color-text-muted);\n  }\n}\n.cart-row[_ngcontent-%COMP%]   .col-action[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n@media (max-width: 768px) {\n  .cart-row[_ngcontent-%COMP%]   .col-action[_ngcontent-%COMP%] {\n    margin-top: 8px;\n  }\n}\n.qty-stepper[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  border: 1px solid var(--color-border);\n  border-radius: 10px;\n  height: 36px;\n  background: var(--color-surface);\n  transition: border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.qty-stepper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--color-primary);\n}\n.qty-stepper[_ngcontent-%COMP%]   .qty-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 100%;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  color: var(--color-text-main);\n  transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.qty-stepper[_ngcontent-%COMP%]   .qty-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--color-hover);\n}\n.qty-stepper[_ngcontent-%COMP%]   .qty-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.3;\n}\n.qty-stepper[_ngcontent-%COMP%]   .qty-input[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 100%;\n  text-align: center;\n  border: none;\n  font-weight: 600;\n  appearance: textfield;\n  background: transparent;\n  color: var(--color-text-main);\n}\n.qty-stepper[_ngcontent-%COMP%]   .qty-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.order-summary-card[_ngcontent-%COMP%] {\n  padding: 32px;\n  border-radius: 16px;\n  position: sticky;\n  top: 90px;\n  border: 1px solid var(--color-border);\n  background: var(--color-surface);\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);\n}\n.order-summary-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 32px 0;\n  font-size: 20px;\n  font-weight: 700;\n}\n.order-summary-card[_ngcontent-%COMP%]   .summary-divider[_ngcontent-%COMP%] {\n  margin: 16px 0;\n}\n.order-summary-card[_ngcontent-%COMP%]   .summary-line[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 16px;\n  font-size: 14px;\n}\n.order-summary-card[_ngcontent-%COMP%]   .summary-line.grand-total[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: var(--color-text-main);\n  padding-top: 16px;\n}\n.order-summary-card[_ngcontent-%COMP%]   .checkout-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 52px;\n  font-size: 16px;\n  font-weight: 600;\n  background:\n    linear-gradient(\n      135deg,\n      #635BFF 0%,\n      #0EA5E9 100%) !important;\n  color: white;\n  border-radius: 10px;\n  box-shadow: 0 8px 25px rgba(99, 91, 255, 0.3);\n  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n  margin-top: 24px;\n}\n.order-summary-card[_ngcontent-%COMP%]   .checkout-btn[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 12px 35px rgba(99, 91, 255, 0.4);\n  transform: translateY(-2px);\n}\n.empty-state[_ngcontent-%COMP%] {\n  padding: 64px;\n  text-align: center;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-illustration[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background: rgba(99, 91, 255, 0.06);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 24px;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-illustration[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  color: var(--color-primary);\n  width: 40px;\n  height: 40px;\n  opacity: 0.5;\n}\n.empty-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  font-weight: 600;\n}\n.empty-state[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n@media print {\n  @page {\n    size: A4;\n    margin: 15mm 20mm;\n  }\n  [_nghost-%COMP%] {\n    display: block !important;\n    background: white !important;\n    -webkit-print-color-adjust: exact !important;\n    print-color-adjust: exact !important;\n  }\n  .cart-page-container[_ngcontent-%COMP%] {\n    max-width: 100% !important;\n    padding: 0 !important;\n    margin: 0 !important;\n    box-shadow: none !important;\n  }\n  .hidden-print[_ngcontent-%COMP%], \n   .page-header[_ngcontent-%COMP%], \n   .checkout-actions[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .print-header[_ngcontent-%COMP%] {\n    display: flex !important;\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n    margin-bottom: 30px;\n    padding-bottom: 20px;\n    border-bottom: 2px solid #000;\n  }\n  .print-header[_ngcontent-%COMP%]   .invoice-brand[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 8px;\n    margin-bottom: 16px;\n  }\n  .print-header[_ngcontent-%COMP%]   .invoice-brand[_ngcontent-%COMP%]   .invoice-logo[_ngcontent-%COMP%] {\n    width: 64px;\n    height: 64px;\n    background: #000;\n    color: white;\n    border-radius: 12px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n  .print-header[_ngcontent-%COMP%]   .invoice-brand[_ngcontent-%COMP%]   .invoice-logo[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 36px;\n    height: 36px;\n    width: 36px;\n  }\n  .print-header[_ngcontent-%COMP%]   .invoice-brand[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    margin: 0;\n    font-size: 24px;\n    font-weight: 800;\n    letter-spacing: 1px;\n    text-transform: uppercase;\n    color: #000;\n  }\n  .print-header[_ngcontent-%COMP%]   .invoice-details[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .print-header[_ngcontent-%COMP%]   .invoice-details[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 20px;\n    color: #555;\n    margin: 0 0 16px 0;\n    letter-spacing: 2px;\n    text-transform: uppercase;\n  }\n  .print-header[_ngcontent-%COMP%]   .invoice-details[_ngcontent-%COMP%]   .meta-grid[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: center;\n    gap: 24px;\n    font-size: 11px;\n    color: #333;\n  }\n  .print-header[_ngcontent-%COMP%]   .invoice-details[_ngcontent-%COMP%]   .meta-grid[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background: #f8f8f8;\n    padding: 8px 16px;\n    border-radius: 6px;\n    border: 1px solid #eee;\n  }\n  .print-header[_ngcontent-%COMP%]   .invoice-details[_ngcontent-%COMP%]   .meta-grid[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%]   .meta-label[_ngcontent-%COMP%] {\n    color: #666;\n    margin-bottom: 4px;\n    font-weight: 600;\n    text-transform: uppercase;\n    font-size: 9px;\n  }\n  .print-header[_ngcontent-%COMP%]   .invoice-details[_ngcontent-%COMP%]   .meta-grid[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%]   .meta-value[_ngcontent-%COMP%] {\n    font-family: "JetBrains Mono", monospace;\n    font-weight: 600;\n    font-size: 12px;\n  }\n  .cart-content[_ngcontent-%COMP%] {\n    display: block !important;\n  }\n  .cart-items-card[_ngcontent-%COMP%] {\n    background: white !important;\n    box-shadow: none !important;\n    border: none !important;\n    padding: 0 !important;\n    border-radius: 0 !important;\n  }\n  .cart-table-header[_ngcontent-%COMP%] {\n    display: grid !important;\n    grid-template-columns: 3fr 1fr 1fr 1.5fr !important;\n    background: #0A2540 !important;\n    color: white !important;\n    border: none !important;\n    padding: 12px 16px !important;\n    font-size: 11px !important;\n    font-weight: 700 !important;\n    border-radius: 8px 8px 0 0 !important;\n  }\n  .cart-table-header[_ngcontent-%COMP%]   .col-action[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .cart-row[_ngcontent-%COMP%] {\n    display: grid !important;\n    grid-template-columns: 3fr 1fr 1fr 1.5fr !important;\n    flex-direction: row !important;\n    padding: 12px 16px !important;\n    border-bottom: 1px solid #eee !important;\n    page-break-inside: avoid;\n    align-items: center !important;\n  }\n  .cart-row[_ngcontent-%COMP%]:nth-child(even) {\n    background: #fcfcfc !important;\n  }\n  .cart-row[_ngcontent-%COMP%]:last-child {\n    border-bottom: 2px solid #0A2540 !important;\n  }\n  .cart-row[_ngcontent-%COMP%]   .col-product[_ngcontent-%COMP%] {\n    display: flex !important;\n    flex-direction: row !important;\n  }\n  .cart-row[_ngcontent-%COMP%]   .col-product[_ngcontent-%COMP%]   .item-meta[_ngcontent-%COMP%]   .item-name[_ngcontent-%COMP%] {\n    font-size: 12px;\n    color: #000;\n    font-weight: 600;\n  }\n  .cart-row[_ngcontent-%COMP%]   .col-product[_ngcontent-%COMP%]   .item-meta[_ngcontent-%COMP%]   .item-code[_ngcontent-%COMP%] {\n    font-size: 10px;\n    color: #666;\n    margin-top: 2px;\n  }\n  .cart-row[_ngcontent-%COMP%]   .col-price[_ngcontent-%COMP%], \n   .cart-row[_ngcontent-%COMP%]   .col-qty[_ngcontent-%COMP%], \n   .cart-row[_ngcontent-%COMP%]   .col-total[_ngcontent-%COMP%] {\n    display: block !important;\n    margin-top: 0 !important;\n    padding-top: 0 !important;\n    border-top: none !important;\n  }\n  .cart-row[_ngcontent-%COMP%]   .col-price[_ngcontent-%COMP%]::before, \n   .cart-row[_ngcontent-%COMP%]   .col-qty[_ngcontent-%COMP%]::before, \n   .cart-row[_ngcontent-%COMP%]   .col-total[_ngcontent-%COMP%]::before {\n    display: none !important;\n    content: none !important;\n  }\n  .cart-row[_ngcontent-%COMP%]   .col-price[_ngcontent-%COMP%] {\n    font-size: 12px;\n    color: #333 !important;\n  }\n  .cart-row[_ngcontent-%COMP%]   .col-total[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 700 !important;\n    color: #000 !important;\n    text-align: right;\n  }\n  .cart-row[_ngcontent-%COMP%]   .col-action[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .print-qty[_ngcontent-%COMP%] {\n    display: inline !important;\n    font-weight: 700;\n    font-size: 12px;\n    background: #f0f0f0;\n    padding: 4px 8px;\n    border-radius: 4px;\n    font-family: "JetBrains Mono", monospace;\n  }\n  .order-summary-card[_ngcontent-%COMP%] {\n    background: white !important;\n    box-shadow: none !important;\n    border: none !important;\n    position: static !important;\n    margin-top: 24px !important;\n    padding: 0 !important;\n    width: 60% !important;\n    margin-left: auto !important;\n    page-break-inside: avoid;\n  }\n  [dir=rtl][_ngcontent-%COMP%]   .order-summary-card[_ngcontent-%COMP%] {\n    margin-left: 0 !important;\n    margin-right: auto !important;\n  }\n  .order-summary-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .order-summary-card[_ngcontent-%COMP%]   .summary-line[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    font-size: 12px;\n    color: #333 !important;\n    padding: 8px 16px;\n    border-bottom: 1px dashed #eee;\n    margin: 0 !important;\n  }\n  .order-summary-card[_ngcontent-%COMP%]   .summary-line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n    font-weight: 600;\n    text-transform: uppercase;\n  }\n  .order-summary-card[_ngcontent-%COMP%]   .summary-line.grand-total[_ngcontent-%COMP%] {\n    font-size: 18px;\n    color: #000 !important;\n    background: #f8f8f8;\n    border-bottom: none;\n    border-radius: 6px;\n    padding: 12px 16px;\n    margin-top: 8px !important;\n  }\n  .order-summary-card[_ngcontent-%COMP%]   .summary-line.grand-total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n    font-weight: 800;\n  }\n  .order-summary-card[_ngcontent-%COMP%]   .summary-divider[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=cart-page.component.css.map */'], data: { animation: [UIAnimations.listAnimation] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CartPageComponent, { className: "CartPageComponent", filePath: "src\\app\\features\\cart\\cart-page\\cart-page.component.ts", lineNumber: 39 });
})();
export {
  CartPageComponent
};
//# sourceMappingURL=chunk-PKKXBVA2.js.map
