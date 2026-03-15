import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly STORAGE_KEY = 'om_admin_auth';
    private readonly ADMIN_USERNAME = 'Admin';
    private readonly ADMIN_PASSWORD = 'admin@123';

    isAdmin = signal(sessionStorage.getItem(this.STORAGE_KEY) === 'true');

    login(username: string, password: string): boolean {
        if (username === this.ADMIN_USERNAME && password === this.ADMIN_PASSWORD) {
            sessionStorage.setItem(this.STORAGE_KEY, 'true');
            this.isAdmin.set(true);
            return true;
        }
        return false;
    }

    logout(): void {
        sessionStorage.removeItem(this.STORAGE_KEY);
        this.isAdmin.set(false);
    }
}
