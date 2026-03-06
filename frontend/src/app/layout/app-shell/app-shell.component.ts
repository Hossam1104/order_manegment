import { Component, computed, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { CartService } from '../../core/services/cart.service';
import { ThemeService } from '../../core/services/theme.service';

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
export class AppShellComponent implements OnInit, OnDestroy {
  translate = inject(TranslateService);
  cartService = inject(CartService);
  breakpointObserver = inject(BreakpointObserver);
  router = inject(Router);
  private themeService = inject(ThemeService);

  cartCount = computed(() => this.cartService.itemCount());
  currentLang = signal(localStorage.getItem('om_lang') || 'en');
  currentDir = computed(() => this.currentLang() === 'ar' ? 'rtl' : 'ltr');

  // Sidebar collapse state
  sidebarCollapsed = signal(false);
  isMobile = signal(false);

  private destroySub = new Subscription();

  constructor() {
    // Restore stored language on startup
    const storedLang = this.currentLang();
    if (storedLang !== 'en') {
      this.translate.use(storedLang);
      document.documentElement.dir = storedLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = storedLang;
    }

    this.translate.onLangChange.subscribe(event => {
      this.currentLang.set(event.lang);
    });
  }

  ngOnInit(): void {
    // Monitor screen size
    const bpSub = this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait
    ]).subscribe(result => {
      this.isMobile.set(result.matches);
      if (result.matches) {
        this.sidebarCollapsed.set(true);
      }
    });

    // Close sidebar on navigation if on mobile
    const routeSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.isMobile()) {
        this.sidebarCollapsed.set(true);
      }
    });

    this.destroySub.add(bpSub);
    this.destroySub.add(routeSub);
  }

  ngOnDestroy(): void {
    this.destroySub.unsubscribe();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.set(!this.sidebarCollapsed());
  }
}
