import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ConfigService } from '../../../core/services/config.service';
import { ThemeService } from '../../../core/services/theme.service';
import { UpdateConfigRequest, TestConnectionRequest } from '../../../core/models/config.model';

@Component({
    selector: 'app-config-panel',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        TranslateModule,
        RouterLink,
        MatTooltipModule
    ],
    templateUrl: './config-panel.component.html',
    styleUrl: './config-panel.component.scss'
})
export class ConfigPanelComponent implements OnInit {
    private fb = inject(FormBuilder);
    private configService = inject(ConfigService);
    private snackBar = inject(MatSnackBar);
    private translate = inject(TranslateService);
    private themeService = inject(ThemeService);

    configForm!: FormGroup;
    seedForm!: FormGroup;
    testing = signal(false);
    saving = signal(false);
    showPassword = signal(false);

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

    ngOnInit(): void {
        const config = this.configService.config();

        this.configForm = this.fb.group({
            server: [config?.serverName || '.', Validators.required],
            databaseName: [config?.databaseName || 'OrderManagementDB', Validators.required],
            username: [config?.dbUsername || 'sa', Validators.required],
            password: ['', Validators.required]
        });

        this.seedForm = this.fb.group({
            seedDataEnabled: [config?.seedDataEnabled || false],
            seedDataCategory: [config?.seedDataCategory || 'All'],
            seedDataCount: [config?.seedDataCount || 100, [Validators.required, Validators.min(1), Validators.max(1000)]]
        });
    }

    async testConnection(): Promise<void> {
        this.testing.set(true);
        try {
            const request: TestConnectionRequest = {
                serverName: this.configForm.get('server')!.value,
                databaseName: this.configForm.get('databaseName')!.value,
                dbUsername: this.configForm.get('username')!.value,
                dbPassword: this.configForm.get('password')!.value
            };

            const response = await this.configService.testConnection(request);

            if (response.success) {
                this.snackBar.open(this.translate.instant('CONFIG.TEST_SUCCESS'), 'OK', {
                    duration: 3000,
                    panelClass: ['snack-success']
                });
            } else {
                this.snackBar.open(
                    this.translate.instant('CONFIG.TEST_FAIL') + ': ' + response.message,
                    'OK',
                    { duration: 5000, panelClass: ['snack-error'] }
                );
            }
        } catch {
            this.snackBar.open(this.translate.instant('CONFIG.TEST_FAIL'), 'OK', {
                duration: 5000,
                panelClass: ['snack-error']
            });
        } finally {
            this.testing.set(false);
        }
    }

    async saveConfig(): Promise<void> {
        if (this.configForm.invalid) return;

        this.saving.set(true);
        try {
            const request: UpdateConfigRequest = {
                serverName: this.configForm.get('server')!.value,
                databaseName: this.configForm.get('databaseName')!.value,
                dbUsername: this.configForm.get('username')!.value,
                dbPassword: this.configForm.get('password')!.value,
                seedDataEnabled: this.seedForm.get('seedDataEnabled')!.value,
                seedDataCount: this.seedForm.get('seedDataCount')!.value,
                seedDataCategory: this.seedForm.get('seedDataCategory')!.value
            };

            await this.configService.updateConfig(request);
            this.snackBar.open(this.translate.instant('CONFIG.SAVE') + ' ✓', 'OK', { duration: 2000 });
        } catch {
            this.snackBar.open(this.translate.instant('ERRORS.SAVE'), 'OK', { duration: 3000 });
        } finally {
            this.saving.set(false);
        }
    }

    togglePasswordVisibility(): void {
        this.showPassword.set(!this.showPassword());
    }
}
