import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { AppConfig, UpdateConfigRequest, TestConnectionRequest } from '../models/config.model';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private readonly apiUrl = 'http://localhost:5050/api/configuration';

    config = signal<AppConfig | null>(null);

    constructor(private http: HttpClient) { }

    async loadConfig(): Promise<void> {
        try {
            const response = await firstValueFrom(
                this.http.get<ApiResponse<AppConfig>>(this.apiUrl)
            );
            if (response.success && response.data) {
                this.config.set(response.data);
            }
        } catch {
            // Configuration load failed, using defaults
        }
    }

    async updateConfig(request: UpdateConfigRequest): Promise<AppConfig> {
        const response = await firstValueFrom(
            this.http.put<ApiResponse<AppConfig>>(this.apiUrl, request)
        );
        if (response.success && response.data) {
            this.config.set(response.data);
        }
        return response.data;
    }

    async testConnection(request: TestConnectionRequest): Promise<ApiResponse<{ success: boolean; message: string }>> {
        return await firstValueFrom(
            this.http.post<ApiResponse<{ success: boolean; message: string }>>(`${this.apiUrl}/test-connection`, request)
        );
    }
}
