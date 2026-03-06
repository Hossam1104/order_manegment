import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { UIAnimations } from '../../../shared/animations/ui.animations';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ItemService } from '../../../core/services/item.service';
import { ItemDto } from '../../../core/models/item.model';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule, ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.scss',
  animations: [UIAnimations.listAnimation]
})
export class ProductGridComponent implements OnInit {
  private itemService = inject(ItemService);

  items = signal<ItemDto[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    // Fetching page 1, size 50 as a storefront default until infinite scroll is added
    this.itemService.getItems(1, 50).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.items.set(response.data.items);
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
