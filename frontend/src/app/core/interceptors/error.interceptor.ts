import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const snackBar = inject(MatSnackBar);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let message = 'An unexpected error occurred';

            if (error.error && error.error.message) {
                message = error.error.message;
            } else if (error.status === 0) {
                message = 'Unable to connect to server';
            } else if (error.status === 404) {
                message = 'Resource not found';
            } else if (error.status === 409) {
                message = error.error?.message || 'Conflict';
            }

            snackBar.open(message, 'OK', {
                duration: 5000,
                horizontalPosition: 'end',
                verticalPosition: 'top'
            });

            return throwError(() => error);
        })
    );
};
