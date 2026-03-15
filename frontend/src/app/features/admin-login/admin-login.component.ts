import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule
    ],
    templateUrl: './admin-login.component.html',
    styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
    private auth = inject(AuthService);
    private router = inject(Router);

    username = '';
    password = '';
    hidePassword = true;
    error = signal(false);

    onSubmit(): void {
        if (this.auth.login(this.username, this.password)) {
            this.error.set(false);
            this.router.navigate(['/']);
        } else {
            this.error.set(true);
        }
    }
}
