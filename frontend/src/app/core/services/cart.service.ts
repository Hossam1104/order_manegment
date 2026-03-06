import { Injectable, computed, effect, signal } from '@angular/core';
import { ItemDto } from '../models/item.model';

export interface CartItem {
    item: ItemDto;
    quantity: number;
}

const CART_STORAGE_KEY = 'om_cart';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cartItems = signal<CartItem[]>(this.loadCart());

    constructor() {
        effect(() => {
            const items = this.cartItems();
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        });
    }

    private loadCart(): CartItem[] {
        try {
            const raw = localStorage.getItem(CART_STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }

    itemCount = computed(() => this.cartItems().reduce((sum: number, ci: CartItem) => sum + ci.quantity, 0));

    subtotal = computed(() =>
        this.cartItems().reduce((sum: number, ci: CartItem) => sum + ci.item.price * ci.quantity, 0)
    );

    vatAmount = computed(() =>
        this.cartItems().reduce((sum: number, ci: CartItem) =>
            sum + (ci.item.price * ci.item.vatPercentage / 100) * ci.quantity, 0)
    );

    grandTotal = computed(() => this.subtotal() + this.vatAmount());

    addItem(item: ItemDto): void {
        const items = this.cartItems();
        const existing = items.find((i: CartItem) => i.item.id === item.id);
        if (existing) {
            this.cartItems.set(items.map((i: CartItem) =>
                i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ));
        } else {
            this.cartItems.set([...items, { item, quantity: 1 }]);
        }
    }

    removeItem(itemId: string): void {
        this.cartItems.set(this.cartItems().filter((ci: CartItem) => ci.item.id !== itemId));
    }

    updateQuantity(itemId: string, quantity: number): void {
        if (quantity < 1) {
            this.removeItem(itemId);
            return;
        }
        this.cartItems.set(
            this.cartItems().map((i: CartItem) =>
                i.item.id === itemId ? { ...i, quantity } : i
            )
        );
    }

    clearCart(): void {
        this.cartItems.set([]);
    }
}
