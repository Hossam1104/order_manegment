import { Component, inject } from '@angular/core';
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
import { RouterLink } from '@angular/router';

import { CartService, CartItem } from '../../../core/services/cart.service';
import { ItemService } from '../../../core/services/item.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { UIAnimations } from '../../../shared/animations/ui.animations';

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
}
