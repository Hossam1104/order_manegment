import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { UIAnimations } from '../../../shared/animations/ui.animations';
import { CartService } from '../../../core/services/cart.service';
import { ItemService } from '../../../core/services/item.service';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  animations: [UIAnimations.fadeSlideInOut, UIAnimations.cardHoverZoom]
})
export class ProductCardComponent {
  cartService = inject(CartService);
  private dialog = inject(MatDialog);
  private itemService = inject(ItemService);

  @Input() item: any;

  isHovered = false;
  translate = inject(TranslateService);

  getItemName(item: any): string {
    if (!item) return '';
    return this.translate.currentLang === 'ar' ? item.nameAR : item.nameEN;
  }

  getImageUrl(): string | null {
    return this.itemService.getImageUrl(this.item?.imagePath);
  }

  addedToCart = false;

  addToCart(event: Event, item: any) {
    event.stopPropagation(); // Stop click from bubbling up to Quick View modal trigger
    this.cartService.addItem(item);
    
    // Fancy success animation state
    this.addedToCart = true;
    setTimeout(() => {
      this.addedToCart = false;
    }, 1500);
  }

  openQuickView() {
    this.dialog.open(ProductDetailModalComponent, {
      width: '900px',
      maxWidth: '95vw',
      panelClass: 'product-quick-view-dialog',
      data: { item: this.item },
      autoFocus: false // Don't snap to the first button
    });
  }
}
