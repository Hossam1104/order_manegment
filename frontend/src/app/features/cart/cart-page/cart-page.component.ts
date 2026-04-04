import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink, Router } from '@angular/router';

import { CartService, CartItem } from '../../../core/services/cart.service';
import { ItemService } from '../../../core/services/item.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { UIAnimations } from '../../../shared/animations/ui.animations';

export type CartSortField = 'code' | 'name' | 'category' | 'price' | 'date';
export type SortDirection = 'asc' | 'desc';

@Component({
    selector: 'app-cart-page',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatDividerModule,
        MatTooltipModule,
        TranslateModule,
        RouterLink
    ],
    templateUrl: './cart-page.component.html',
    styleUrl: './cart-page.component.scss',
    animations: [UIAnimations.listAnimation]
})
export class CartPageComponent {
    cartService = inject(CartService);
    private itemService = inject(ItemService);
    private router = inject(Router);

    sortField = signal<CartSortField>('date');
    sortDirection = signal<SortDirection>('desc');

    sortedCartItems = computed(() => {
        const itemsList = this.cartService.cartItems();
        const field = this.sortField();
        const direction = this.sortDirection();
        const modifier = direction === 'asc' ? 1 : -1;

        return [...itemsList].sort((a, b) => {
            switch (field) {
                case 'code':
                    return modifier * a.item.itemCode.localeCompare(b.item.itemCode);
                case 'name':
                    return modifier * a.item.nameEN.localeCompare(b.item.nameEN);
                case 'category':
                    return modifier * a.item.category.localeCompare(b.item.category);
                case 'price':
                    return modifier * (a.item.price - b.item.price);
                case 'date':
                default:
                    return modifier * (new Date(a.item.createdAt).getTime() - new Date(b.item.createdAt).getTime());
            }
        });
    });

    get shopPath(): string {
        return this.router.url.startsWith('/shop') ? '/shop' : '/';
    }
    private dialog = inject(MatDialog);
    private snackBar = inject(MatSnackBar);
    private translate = inject(TranslateService);

    currentDate = new Date();

    get currentLang(): string {
        return this.translate.currentLang || 'en';
    }

    getItemName(cartItem: CartItem): string {
        return this.currentLang === 'ar' ? cartItem.item.nameAR : cartItem.item.nameEN;
    }

    onQtyChange(cartItem: CartItem, value: number): void {
        this.cartService.updateQuantity(cartItem.item.id, value);
    }

    incrementQty(cartItem: CartItem): void {
        this.onQtyChange(cartItem, cartItem.quantity + 1);
    }

    decrementQty(cartItem: CartItem): void {
        this.onQtyChange(cartItem, cartItem.quantity - 1);
    }

    removeItem(cartItem: CartItem): void {
        this.cartService.removeItem(cartItem.item.id);
    }

    clearCart(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                title: this.translate.instant('CART.CLEAR'),
                message: this.translate.instant('CART.CLEAR') + '?'
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.cartService.clearCart();
            }
        });
    }

    getImageUrl(cartItem: CartItem): string | null {
        return this.itemService.getImageUrl(cartItem.item.imagePath);
    }

    printInvoice(): void {
        window.print();
    }

    setSortField(field: CartSortField): void {
        if (this.sortField() === field) {
            this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
        } else {
            this.sortField.set(field);
            this.sortDirection.set('asc');
        }
    }

    getSortIcon(field: CartSortField): string {
        if (this.sortField() !== field) {
            return 'swap_vert';
        }
        return this.sortDirection() === 'asc' ? 'arrow_upward' : 'arrow_downward';
    }

    isActiveSort(field: CartSortField): boolean {
        return this.sortField() === field;
    }
}
