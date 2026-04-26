import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { ConfigService } from './core/services/config.service';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', `.json?v=${Date.now()}`);
}

function applyDocumentLanguage(language: string): void {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
}

export function initializeApp(configService: ConfigService, translate: TranslateService): () => Promise<void> {
    return async () => {
        const language = localStorage.getItem('om_lang') || 'en';

        translate.setDefaultLang('en');
        applyDocumentLanguage(language);

        await Promise.all([
            configService.loadConfig(),
            firstValueFrom(translate.use(language))
        ]);
    };
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideAnimationsAsync(),
        importProvidersFrom(
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: createTranslateLoader,
                    deps: [HttpClient]
                },
                defaultLanguage: 'en'
            })
        ),
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [ConfigService, TranslateService],
            multi: true
        }
    ]
};
