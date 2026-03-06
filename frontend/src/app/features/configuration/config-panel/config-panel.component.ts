import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ThemeService } from '../../../core/services/theme.service';

@Component({
    selector: 'app-config-panel',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        TranslateModule,
        RouterLink,
        MatTooltipModule
    ],
    templateUrl: './config-panel.component.html',
    styleUrl: './config-panel.component.scss'
})
export class ConfigPanelComponent {
    private translate = inject(TranslateService);
    private themeService = inject(ThemeService);

    isDark = this.themeService.isDark;
    isArabic = signal(localStorage.getItem('om_lang') === 'ar');

    toggleTheme(): void {
        this.themeService.toggle();
    }

    toggleLang(): void {
        const newLang = this.isArabic() ? 'en' : 'ar';
        this.isArabic.set(newLang === 'ar');
        this.translate.use(newLang);
        localStorage.setItem('om_lang', newLang);
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
    }
}
