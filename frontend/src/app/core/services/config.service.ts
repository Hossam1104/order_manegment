import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    async loadConfig(): Promise<void> {
        // No remote config needed — Supabase handles the database layer
    }
}
