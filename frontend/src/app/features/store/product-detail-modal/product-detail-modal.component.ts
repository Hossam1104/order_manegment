import { Component, Inject, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../core/services/cart.service';
import { ItemService } from '../../../core/services/item.service';

@Component({
  selector: 'app-product-detail-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './product-detail-modal.component.html',
  styleUrl: './product-detail-modal.component.scss'
})
export class ProductDetailModalComponent {
  private cartService = inject(CartService);
  private itemService = inject(ItemService);
  translate = inject(TranslateService);

  quantity = 1;

  getItemName(): string {
    const item = this.data?.item;
    if (!item) return '';
    return this.translate.currentLang === 'ar' ? item.nameAR : item.nameEN;
  }

  constructor(
    public dialogRef: MatDialogRef<ProductDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: any }
  ) { }

  getImageUrl(): string | null {
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
}
