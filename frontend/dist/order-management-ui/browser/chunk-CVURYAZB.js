import {
  UIAnimations
} from "./chunk-APV7DXHN.js";
import {
  ItemService,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-SEC6B5R6.js";
import {
  CartService
} from "./chunk-MZ6CBEQ5.js";
import {
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatMiniFabButton,
  TranslateModule,
  TranslatePipe,
  TranslateService
} from "./chunk-YDAIAYGZ.js";
import {
  CommonModule,
  DecimalPipe,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-5TIXBMSX.js";

// src/app/features/store/product-detail-modal/product-detail-modal.component.ts
function ProductDetailModalComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("+ ", ctx_r0.data.item.vatPercentage, "% ", \u0275\u0275pipeBind1(2, 2, "STORE.VAT_INCL"), "");
  }
}
var ProductDetailModalComponent = class _ProductDetailModalComponent {
  dialogRef;
  data;
  cartService = inject(CartService);
  itemService = inject(ItemService);
  translate = inject(TranslateService);
  quantity = 1;
  getItemName() {
    const item = this.data?.item;
    if (!item)
      return "";
    return this.translate.currentLang === "ar" ? item.nameAR : item.nameEN;
  }
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
  }
  getImageUrl() {
    return this.itemService.getImageUrl(this.data.item?.imagePath);
  }
  increment() {
    this.quantity++;
  }
  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  addToCart() {
    for (let i = 0; i < this.quantity; i++) {
      this.cartService.addItem(this.data.item);
    }
    this.dialogRef.close();
  }
  static \u0275fac = function ProductDetailModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductDetailModalComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductDetailModalComponent, selectors: [["app-product-detail-modal"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 37, vars: 18, consts: [[1, "product-modal"], ["mat-icon-button", "", 1, "modal-close", 3, "click"], [1, "modal-content"], [1, "modal-image-col"], ["alt", "Product image", "title", "Product image", 3, "src"], [1, "modal-info-col"], [1, "item-code", "text-muted"], [1, "item-title"], [1, "price-section"], [1, "price"], [1, "sar-icon"], [1, "vat-badge"], [1, "divider"], [1, "purchase-actions"], [1, "qty-stepper"], ["type", "button", 1, "qty-btn", 3, "click", "disabled"], [1, "qty-display"], ["type", "button", 1, "qty-btn", 3, "click"], ["mat-flat-button", "", "color", "primary", 1, "add-btn", 3, "click"]], template: function ProductDetailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275listener("click", function ProductDetailModalComponent_Template_button_click_1_listener() {
        return ctx.dialogRef.close();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "close");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 2)(5, "div", 3);
      \u0275\u0275element(6, "img", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "h2", 7);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 8)(13, "span", 9);
      \u0275\u0275text(14);
      \u0275\u0275pipe(15, "number");
      \u0275\u0275element(16, "span", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275template(17, ProductDetailModalComponent_Conditional_17_Template, 3, 4, "span", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275element(18, "div", 12);
      \u0275\u0275elementStart(19, "div", 13)(20, "label");
      \u0275\u0275text(21);
      \u0275\u0275pipe(22, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 14)(24, "button", 15);
      \u0275\u0275listener("click", function ProductDetailModalComponent_Template_button_click_24_listener() {
        return ctx.decrement();
      });
      \u0275\u0275elementStart(25, "mat-icon");
      \u0275\u0275text(26, "remove");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div", 16);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "button", 17);
      \u0275\u0275listener("click", function ProductDetailModalComponent_Template_button_click_29_listener() {
        return ctx.increment();
      });
      \u0275\u0275elementStart(30, "mat-icon");
      \u0275\u0275text(31, "add");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "button", 18);
      \u0275\u0275listener("click", function ProductDetailModalComponent_Template_button_click_32_listener() {
        return ctx.addToCart();
      });
      \u0275\u0275elementStart(33, "mat-icon");
      \u0275\u0275text(34, "shopping_cart_checkout");
      \u0275\u0275elementEnd();
      \u0275\u0275text(35);
      \u0275\u0275pipe(36, "translate");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("src", ctx.getImageUrl() || "assets/placeholder-image.png", \u0275\u0275sanitizeUrl);
      \u0275\u0275attribute("alt", ctx.getItemName())("title", ctx.getItemName());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.data.item.itemCode);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.getItemName());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(15, 11, ctx.data.item.price, "1.2-2"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.data.item.vatPercentage > 0 ? 17 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 14, "MODAL.QUANTITY"));
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.quantity <= 1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.quantity);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(36, 16, "MODAL.ADD_TO_CART"), " ");
    }
  }, dependencies: [CommonModule, DecimalPipe, MatDialogModule, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, TranslateModule, TranslatePipe], styles: ['\n\n.product-modal[_ngcontent-%COMP%] {\n  position: relative;\n  background: var(--color-surface);\n  border-radius: 16px;\n  overflow: hidden;\n}\n.product-modal[_ngcontent-%COMP%]   .modal-close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  z-index: 10;\n  color: var(--color-text-muted);\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(8px);\n  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.product-modal[_ngcontent-%COMP%]   .modal-close[_ngcontent-%COMP%]:hover {\n  color: var(--color-danger);\n  background: rgba(255, 255, 255, 0.95);\n}\n.product-modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 400px;\n  max-height: 90vh;\n}\n@media (min-width: 768px) {\n  .product-modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%] {\n    flex-direction: row;\n    min-width: 750px;\n  }\n}\n.product-modal[_ngcontent-%COMP%]   .modal-image-col[_ngcontent-%COMP%] {\n  background: var(--color-surface);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  padding: 16px;\n}\n@media (min-width: 768px) {\n  .product-modal[_ngcontent-%COMP%]   .modal-image-col[_ngcontent-%COMP%] {\n    width: 45%;\n    border-right: 1px solid var(--color-border);\n  }\n}\n@media (max-width: 767px) {\n  .product-modal[_ngcontent-%COMP%]   .modal-image-col[_ngcontent-%COMP%] {\n    height: 300px;\n  }\n}\n.product-modal[_ngcontent-%COMP%]   .modal-image-col[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);\n  mix-blend-mode: multiply;\n}\n.dark-theme[_ngcontent-%COMP%]   .product-modal[_ngcontent-%COMP%]   .modal-image-col[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  mix-blend-mode: normal;\n}\n.product-modal[_ngcontent-%COMP%]   .modal-image-col[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%] {\n  padding: 40px;\n  display: flex;\n  flex-direction: column;\n}\n@media (min-width: 768px) {\n  .product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%] {\n    width: 55%;\n  }\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .item-code[_ngcontent-%COMP%] {\n  font-family:\n    "JetBrains Mono",\n    "Fira Code",\n    monospace;\n  font-size: 12px;\n  margin-bottom: 8px;\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  color: var(--color-primary);\n  background: rgba(99, 91, 255, 0.06);\n  padding: 4px 10px;\n  border-radius: 6px;\n  display: inline-block;\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .item-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  letter-spacing: -0.5px;\n  margin: 8px 0 16px 0;\n  line-height: 1.2;\n}\n@media (max-width: 767px) {\n  .product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .item-title[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .price-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  margin-bottom: 32px;\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .price-section[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  background:\n    linear-gradient(\n      135deg,\n      #635BFF 0%,\n      #0EA5E9 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n@media (max-width: 767px) {\n  .product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .price-section[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .price-section[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]   .sar-symbol[_ngcontent-%COMP%] {\n  font-size: 14px;\n  opacity: 0.6;\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .price-section[_ngcontent-%COMP%]   .vat-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  padding: 4px 12px;\n  border-radius: 100px;\n  background: rgba(99, 91, 255, 0.08);\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--color-border);\n  margin: 24px 0;\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .purchase-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  margin-bottom: 32px;\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .purchase-actions[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .purchase-actions[_ngcontent-%COMP%]   .qty-stepper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  border: 1px solid var(--color-border);\n  border-radius: 10px;\n  height: 48px;\n  width: 140px;\n  transition: border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .purchase-actions[_ngcontent-%COMP%]   .qty-stepper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--color-primary);\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .purchase-actions[_ngcontent-%COMP%]   .qty-stepper[_ngcontent-%COMP%]   .qty-btn[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 100%;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--color-text-main);\n  transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .purchase-actions[_ngcontent-%COMP%]   .qty-stepper[_ngcontent-%COMP%]   .qty-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--color-hover);\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .purchase-actions[_ngcontent-%COMP%]   .qty-stepper[_ngcontent-%COMP%]   .qty-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.3;\n  cursor: not-allowed;\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .purchase-actions[_ngcontent-%COMP%]   .qty-stepper[_ngcontent-%COMP%]   .qty-display[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center;\n  font-weight: 700;\n  font-size: 16px;\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .purchase-actions[_ngcontent-%COMP%]   .add-btn[_ngcontent-%COMP%] {\n  height: 52px;\n  font-size: 16px;\n  font-weight: 600;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      #635BFF 0%,\n      #0EA5E9 100%) !important;\n  color: white;\n  box-shadow: 0 8px 25px rgba(99, 91, 255, 0.3);\n  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .purchase-actions[_ngcontent-%COMP%]   .add-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n.product-modal[_ngcontent-%COMP%]   .modal-info-col[_ngcontent-%COMP%]   .purchase-actions[_ngcontent-%COMP%]   .add-btn[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 12px 35px rgba(99, 91, 255, 0.4);\n  transform: translateY(-2px);\n}\n/*# sourceMappingURL=product-detail-modal.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductDetailModalComponent, { className: "ProductDetailModalComponent", filePath: "src\\app\\features\\store\\product-detail-modal\\product-detail-modal.component.ts", lineNumber: 17 });
})();

// src/app/features/store/product-card/product-card.component.ts
function ProductCardComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "STORE.VAT_INCL"));
  }
}
var ProductCardComponent = class _ProductCardComponent {
  cartService = inject(CartService);
  dialog = inject(MatDialog);
  itemService = inject(ItemService);
  item;
  isHovered = false;
  translate = inject(TranslateService);
  getItemName(item) {
    if (!item)
      return "";
    return this.translate.currentLang === "ar" ? item.nameAR : item.nameEN;
  }
  getImageUrl() {
    return this.itemService.getImageUrl(this.item?.imagePath);
  }
  addedToCart = false;
  addToCart(event, item) {
    event.stopPropagation();
    this.cartService.addItem(item);
    this.addedToCart = true;
    setTimeout(() => {
      this.addedToCart = false;
    }, 1500);
  }
  openQuickView() {
    this.dialog.open(ProductDetailModalComponent, {
      width: "900px",
      maxWidth: "95vw",
      panelClass: "product-quick-view-dialog",
      data: { item: this.item },
      autoFocus: false
      // Don't snap to the first button
    });
  }
  static \u0275fac = function ProductCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductCardComponent, selectors: [["app-product-card"]], inputs: { item: "item" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 18, vars: 16, consts: [[1, "product-card", 3, "mouseenter", "mouseleave", "click"], [1, "image-wrapper"], ["alt", "Product image", "title", "Product image", 1, "product-image", 3, "src"], [1, "product-info"], [1, "product-details"], [1, "product-header"], [1, "product-name"], [1, "vat-badge"], [1, "product-price"], [1, "sar-icon"], ["mat-mini-fab", "", 1, "add-btn", 3, "click"]], template: function ProductCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("mouseenter", function ProductCardComponent_Template_div_mouseenter_0_listener() {
        return ctx.isHovered = true;
      })("mouseleave", function ProductCardComponent_Template_div_mouseleave_0_listener() {
        return ctx.isHovered = false;
      })("click", function ProductCardComponent_Template_div_click_0_listener() {
        return ctx.openQuickView();
      });
      \u0275\u0275elementStart(1, "div", 1);
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "h3", 6);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275template(8, ProductCardComponent_Conditional_8_Template, 3, 3, "span", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 8);
      \u0275\u0275text(10);
      \u0275\u0275pipe(11, "number");
      \u0275\u0275elementStart(12, "span", 9);
      \u0275\u0275text(13, "\u20AA");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "button", 10);
      \u0275\u0275pipe(15, "translate");
      \u0275\u0275listener("click", function ProductCardComponent_Template_button_click_14_listener($event) {
        return ctx.addToCart($event, ctx.item);
      });
      \u0275\u0275elementStart(16, "mat-icon");
      \u0275\u0275text(17);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("src", ctx.getImageUrl() || "assets/placeholder-image.png", \u0275\u0275sanitizeUrl)("@cardHoverZoom", ctx.isHovered ? "hovered" : "default");
      \u0275\u0275attribute("alt", ctx.getItemName(ctx.item))("title", ctx.getItemName(ctx.item));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.getItemName(ctx.item));
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.item == null ? null : ctx.item.vatPercentage) > 0 ? 8 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(11, 11, ctx.item == null ? null : ctx.item.netTotal, "1.2-2"), " ");
      \u0275\u0275advance(4);
      \u0275\u0275classProp("success-state", ctx.addedToCart);
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(15, 14, ctx.addedToCart ? "FORM.SAVE" : "STORE.ADD_TO_CART"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.addedToCart ? "check" : "add");
    }
  }, dependencies: [CommonModule, DecimalPipe, MatButtonModule, MatMiniFabButton, MatIconModule, MatIcon, TranslateModule, TranslatePipe], styles: ['\n\n.product-card[_ngcontent-%COMP%] {\n  background: var(--color-surface);\n  border-radius: 16px;\n  border: 1px solid var(--color-border);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  cursor: pointer;\n  overflow: hidden;\n  position: relative;\n  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.product-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px) scale(1.01);\n  box-shadow: 0 10px 25px rgba(99, 91, 255, 0.15);\n  border-color: #635BFF;\n}\n.product-card[_ngcontent-%COMP%]:hover   .image-wrapper[_ngcontent-%COMP%]::after {\n  opacity: 1;\n}\n.product-card[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 4/3;\n  overflow: hidden;\n  background: var(--color-surface);\n  padding: 6px;\n}\n.product-card[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  transform-origin: center center;\n  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);\n  border-radius: 8px;\n  mix-blend-mode: multiply;\n}\n.dark-theme[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%] {\n  mix-blend-mode: normal;\n}\n.product-card[_ngcontent-%COMP%]:hover   .product-card[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%] {\n  transform: scale(1.1);\n}\n.product-card[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 60%;\n  background:\n    linear-gradient(\n      to top,\n      rgba(0, 0, 0, 0.4) 0%,\n      rgba(0, 0, 0, 0) 100%);\n  opacity: 0;\n  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n  pointer-events: none;\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%] {\n  padding: 6px 8px 8px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  flex-grow: 1;\n  gap: 4px;\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  overflow: hidden;\n  gap: 2px;\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 8px;\n  margin-bottom: 2px;\n}\n@media (max-width: 360px) {\n  .product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-header[_ngcontent-%COMP%]   .product-name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-text-main);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  line-height: 1.3;\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-header[_ngcontent-%COMP%]   .vat-badge[_ngcontent-%COMP%] {\n  font-size: 7px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  font-weight: 700;\n  color: var(--color-primary);\n  background: rgba(99, 91, 255, 0.08);\n  padding: 1px 4px;\n  border-radius: 100px;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-primary);\n  margin-bottom: 0;\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  line-height: 1;\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%]   .sar-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 500;\n  opacity: 0.6;\n  margin-inline-start: 3px;\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .add-btn[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #635BFF 0%,\n      #0EA5E9 100%) !important;\n  color: white;\n  box-shadow: 0 3px 12px rgba(99, 91, 255, 0.25);\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(99, 91, 255, 0.4);\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .add-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .add-btn.success-state[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981 0%,\n      #059669 100%) !important;\n  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);\n  transform: scale(1.05);\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .add-btn.success-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  transform: scale(1.2) rotate(360deg);\n  transition: transform 0.3s ease;\n}\n/*# sourceMappingURL=product-card.component.css.map */'], data: { animation: [UIAnimations.fadeSlideInOut, UIAnimations.cardHoverZoom] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductCardComponent, { className: "ProductCardComponent", filePath: "src\\app\\features\\store\\product-card\\product-card.component.ts", lineNumber: 20 });
})();

// src/app/features/store/product-grid/product-grid.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ProductGridComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-product-card", 5);
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("item", item_r1);
  }
}
function ProductGridComponent_ForEmpty_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "mat-icon", 7);
    \u0275\u0275text(2, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 2, "STORE.NO_PRODUCTS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 4, "STORE.NO_PRODUCTS_HINT"));
  }
}
var ProductGridComponent = class _ProductGridComponent {
  itemService = inject(ItemService);
  items = signal([]);
  loading = signal(true);
  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this.loading.set(true);
    this.itemService.getItems(1, 1e4).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.items.set(response.data.items);
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  static \u0275fac = function ProductGridComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductGridComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductGridComponent, selectors: [["app-product-grid"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 12, vars: 8, consts: [[1, "store-hero"], [1, "hero-content"], [1, "hero-title"], [1, "hero-subtitle"], [1, "product-grid"], [3, "item"], [1, "empty-state"], [1, "empty-icon"]], template: function ProductGridComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "translate");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "div", 4);
      \u0275\u0275repeaterCreate(9, ProductGridComponent_For_10_Template, 1, 1, "app-product-card", 5, _forTrack0, false, ProductGridComponent_ForEmpty_11_Template, 9, 6, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 4, "STORE.HERO_TITLE"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 6, "STORE.HERO_SUBTITLE"));
      \u0275\u0275advance(2);
      \u0275\u0275property("@listAnimation", ctx.items().length);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.items());
    }
  }, dependencies: [CommonModule, MatIconModule, MatIcon, TranslateModule, TranslatePipe, ProductCardComponent], styles: ['\n\n@keyframes _ngcontent-%COMP%_popIn {\n  0% {\n    opacity: 0;\n    transform: scale(0.9) translateY(20px);\n  }\n  70% {\n    transform: scale(1.02) translateY(-5px);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_floatText {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-6px);\n  }\n}\n@keyframes _ngcontent-%COMP%_drift {\n  0% {\n    background-position: 0 0;\n  }\n  100% {\n    background-position: 64px 64px;\n  }\n}\n.store-hero[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n  padding: 64px 40px;\n  background:\n    linear-gradient(\n      135deg,\n      #0F172A 0%,\n      #1E293B 50%,\n      #635BFF 100%);\n  border-radius: 16px;\n  color: white;\n  position: relative;\n  overflow: hidden;\n  box-shadow: 0 10px 40px rgba(99, 91, 255, 0.2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n}\n.store-hero[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-image:\n    radial-gradient(\n      circle at 2px 2px,\n      rgba(255, 255, 255, 0.15) 1px,\n      transparent 0);\n  background-size: 32px 32px;\n  z-index: 1;\n  opacity: 0.4;\n  animation: _ngcontent-%COMP%_drift 20s linear infinite;\n}\n@media (max-width: 768px) {\n  .store-hero[_ngcontent-%COMP%] {\n    padding: 40px 24px;\n  }\n}\n.store-hero[_ngcontent-%COMP%]   .hero-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.store-hero[_ngcontent-%COMP%]   .hero-title[_ngcontent-%COMP%] {\n  font-size: 42px;\n  font-weight: 800;\n  margin: 0 0 16px 0;\n  letter-spacing: -1px;\n  line-height: 1.2;\n  animation: _ngcontent-%COMP%_popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both, _ngcontent-%COMP%_floatText 4s ease-in-out infinite 0.8s;\n}\n@media (max-width: 768px) {\n  .store-hero[_ngcontent-%COMP%]   .hero-title[_ngcontent-%COMP%] {\n    font-size: 32px;\n  }\n}\n.store-hero[_ngcontent-%COMP%]   .hero-subtitle[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin: 0;\n  opacity: 0.9;\n  max-width: 580px;\n  line-height: 1.6;\n  animation: _ngcontent-%COMP%_popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;\n}\n@media (max-width: 768px) {\n  .store-hero[_ngcontent-%COMP%]   .hero-subtitle[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n}\n.store-hero[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  right: -80px;\n  top: -80px;\n  width: 400px;\n  height: 400px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(99, 91, 255, 0.3) 0%,\n      transparent 70%);\n  border-radius: 50%;\n  animation: pulse-glow 4s ease-in-out infinite;\n}\n.store-hero[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  left: 40%;\n  bottom: -100px;\n  width: 300px;\n  height: 300px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(14, 165, 233, 0.2) 0%,\n      transparent 70%);\n  border-radius: 50%;\n  animation: pulse-glow 5s ease-in-out infinite reverse;\n}\n.product-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: 12px;\n}\n@media (max-width: 1200px) {\n  .product-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(4, 1fr);\n  }\n}\n@media (max-width: 992px) {\n  .product-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .product-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 16px;\n  }\n}\n@media (max-width: 480px) {\n  .product-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 8px;\n  }\n}\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 64px 0;\n  color: var(--color-text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 24px;\n  opacity: 0.3;\n  color: var(--color-primary);\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  color: var(--color-text-main);\n  font-weight: 600;\n  font-size: 20px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n}\n/*# sourceMappingURL=product-grid.component.css.map */'], data: { animation: [UIAnimations.listAnimation] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductGridComponent, { className: "ProductGridComponent", filePath: "src\\app\\features\\store\\product-grid\\product-grid.component.ts", lineNumber: 18 });
})();
export {
  ProductGridComponent
};
//# sourceMappingURL=chunk-CVURYAZB.js.map
