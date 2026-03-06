import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./features/store/product-grid/product-grid.component').then(m => m.ProductGridComponent)
    },
    {
        path: 'admin',
        loadComponent: () => import('./features/items/item-list/item-list.component').then(m => m.ItemListComponent)
    },
    {
        path: 'admin/configuration',
        loadComponent: () => import('./features/configuration/config-panel/config-panel.component').then(m => m.ConfigPanelComponent)
    },
    {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart-page/cart-page.component').then(m => m.CartPageComponent)
    },
    { path: '**', redirectTo: '' }
];
