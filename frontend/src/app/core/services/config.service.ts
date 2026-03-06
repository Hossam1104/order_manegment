import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    config = signal<null>(null);

    async loadConfig(): Promise<void> {
        // No remote config needed — Supabase handles the database layer
    }
}
