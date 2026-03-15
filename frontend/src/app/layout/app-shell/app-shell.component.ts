import { Component, computed, signal, inject, OnInit, OnDestroy, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { MatSidenavModule, MatSidenavContent } from '@angular/material/sidenav';
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
import { AuthService } from '../../core/services/auth.service';

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
export class AppShellComponent implements OnInit, OnDestroy, AfterViewInit {
  translate = inject(TranslateService);
  cartService = inject(CartService);
  breakpointObserver = inject(BreakpointObserver);
  router = inject(Router);
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  private ngZone = inject(NgZone);

  @ViewChild(MatSidenavContent) sidenavContent!: MatSidenavContent;

  cartCount = computed(() => this.cartService.itemCount());
  currentLang = signal(localStorage.getItem('om_lang') || 'en');
  currentDir = computed(() => this.currentLang() === 'ar' ? 'rtl' : 'ltr');

  // Sidebar collapse state
  sidebarCollapsed = signal(false);
  isMobile = signal(false);
  showScrollTop = signal(false);

  private destroySub = new Subscription();
  private scrollHandler = () => {
    const scrollTop = this.sidenavContent?.getElementRef().nativeElement.scrollTop ?? 0;
    const visible = scrollTop > 300;
    if (this.showScrollTop() !== visible) {
      this.ngZone.run(() => this.showScrollTop.set(visible));
    }
  };

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

  ngAfterViewInit(): void {
    const el = this.sidenavContent?.getElementRef().nativeElement;
    if (el) {
      this.ngZone.runOutsideAngular(() => {
        el.addEventListener('scroll', this.scrollHandler, { passive: true });
      });
    }
  }

  ngOnDestroy(): void {
    this.destroySub.unsubscribe();
    const el = this.sidenavContent?.getElementRef().nativeElement;
    el?.removeEventListener('scroll', this.scrollHandler);
  }

  scrollToTop(): void {
    this.sidenavContent?.getElementRef().nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.set(!this.sidebarCollapsed());
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
