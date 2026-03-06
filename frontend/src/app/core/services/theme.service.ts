import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    isDark = signal(this.getStoredTheme());

    constructor() {
        this.applyTheme();
    }

    toggle(): void {
        this.isDark.set(!this.isDark());
        this.applyTheme();
        localStorage.setItem('om_theme', this.isDark() ? 'dark' : 'light');
    }

    private getStoredTheme(): boolean {
        return localStorage.getItem('om_theme') === 'dark';
    }

    private applyTheme(): void {
        if (this.isDark()) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
}
