import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    if (auth.isAdmin()) {
        return true;
    }
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
};
