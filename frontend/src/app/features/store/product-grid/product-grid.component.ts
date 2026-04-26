import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { UIAnimations } from '../../../shared/animations/ui.animations';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ItemService } from '../../../core/services/item.service';
import { ItemDto } from '../../../core/models/item.model';

export type SortField = 'code' | 'name' | 'category' | 'price' | 'date';
export type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, TranslateModule, ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.scss',
  animations: [UIAnimations.listAnimation]
})
export class ProductGridComponent implements OnInit {
  private itemService = inject(ItemService);

  readonly whatsappDisplayNumber = '+966596800850';
  readonly whatsappLink = 'https://wa.me/966596800850';

  items = signal<ItemDto[]>([]);
  loading = signal(true);

  sortField = signal<SortField>('date');
  sortDirection = signal<SortDirection>('desc');

  sortedItems = computed(() => {
    const itemsList = this.items();
    const field = this.sortField();
    const direction = this.sortDirection();
    const modifier = direction === 'asc' ? 1 : -1;

    return [...itemsList].sort((a, b) => {
      switch (field) {
        case 'code':
          return modifier * a.itemCode.localeCompare(b.itemCode);
        case 'name':
          return modifier * a.nameEN.localeCompare(b.nameEN);
        case 'category':
          return modifier * a.category.localeCompare(b.category);
        case 'price':
          return modifier * (a.price - b.price);
        case 'date':
        default:
          return modifier * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      }
    });
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.itemService.getItems(1, 10000).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.items.set(response.data.items);
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  setSortField(field: SortField): void {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }

  getSortIcon(field: SortField): string {
    if (this.sortField() !== field) {
      return 'swap_vert';
    }
    return this.sortDirection() === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  isActiveSort(field: SortField): boolean {
    return this.sortField() === field;
  }
}
