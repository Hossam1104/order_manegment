import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    // ── ADMIN LOGIN ──
    {
        path: 'login',
        loadComponent: () => import('./features/admin-login/admin-login.component').then(m => m.AdminLoginComponent)
    },

    // ── ADMIN ROUTES (protected — wrapped in AppShellComponent) ──
    {
        path: '',
        loadComponent: () => import('./layout/app-shell/app-shell.component').then(m => m.AppShellComponent),
        canActivate: [adminGuard],
        children: [
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
            }
        ]
    },

    // ── CUSTOMER ROUTES (new — wrapped in CustomerShellComponent) ──
    {
        path: 'shop',
        loadComponent: () => import('./layout/customer-shell/customer-shell.component').then(m => m.CustomerShellComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./features/store/product-grid/product-grid.component').then(m => m.ProductGridComponent)
            },
            {
                path: 'cart',
                loadComponent: () => import('./features/cart/cart-page/cart-page.component').then(m => m.CartPageComponent)
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    },

    { path: '**', redirectTo: 'shop' }
];
