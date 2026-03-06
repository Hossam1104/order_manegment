import { Component, computed, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatTooltipModule,
    TranslateModule,
    MatDividerModule,
    TopNavbarComponent
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {
  translate = inject(TranslateService);
  cartService = inject(CartService);

  cartCount = computed(() => this.cartService.itemCount());
  currentLang = signal(localStorage.getItem('om_lang') || 'en');
  currentDir = computed(() => this.currentLang() === 'ar' ? 'rtl' : 'ltr');
  
  // Sidebar collapse state
  sidebarCollapsed = signal(false);

  toggleSidebar(): void {
    this.sidebarCollapsed.set(!this.sidebarCollapsed());
  }

  constructor() {
    this.translate.onLangChange.subscribe(event => {
      this.currentLang.set(event.lang);
    });
  }
}
