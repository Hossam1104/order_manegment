import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ItemService } from '../../../core/services/item.service';

@Component({
    selector: 'app-bulk-upload',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        MatSnackBarModule,
        TranslateModule
    ],
    templateUrl: './bulk-upload.component.html',
    styleUrl: './bulk-upload.component.scss'
})
export class BulkUploadComponent {
    private itemService = inject(ItemService);
    private dialogRef = inject(MatDialogRef<BulkUploadComponent>);
    private snackBar = inject(MatSnackBar);
    private translate = inject(TranslateService);

    selectedFile = signal<File | null>(null);
    uploading = signal(false);
    uploadComplete = signal(false);
    successCount = signal(0);
    errors = signal<string[]>([]);

    downloadTemplate(): void {
        this.itemService.downloadBulkUploadTemplate().subscribe({
            next: (blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'items_bulk_upload_template.xlsx';
                a.click();
                window.URL.revokeObjectURL(url);
            },
            error: () => {
                this.snackBar.open(
                    this.translate.instant('ERRORS.LOAD'),
                    'OK',
                    { duration: 3000 }
                );
            }
        });
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            if (!file.name.endsWith('.xlsx')) {
                this.snackBar.open(
                    this.translate.instant('BULK_UPLOAD.INVALID_FORMAT'),
                    'OK',
                    { duration: 3000 }
                );
                input.value = '';
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                this.snackBar.open(
                    this.translate.instant('BULK_UPLOAD.FILE_TOO_LARGE'),
                    'OK',
                    { duration: 3000 }
                );
                input.value = '';
                return;
            }
            this.selectedFile.set(file);
            this.errors.set([]);
            this.uploadComplete.set(false);
        }
    }

    removeFile(): void {
        this.selectedFile.set(null);
        this.errors.set([]);
        this.uploadComplete.set(false);
    }

    upload(): void {
        const file = this.selectedFile();
        if (!file) return;

        this.uploading.set(true);
        this.errors.set([]);
        this.uploadComplete.set(false);

        this.itemService.bulkUpload(file).subscribe({
            next: (response) => {
                this.uploading.set(false);
                this.uploadComplete.set(true);
                this.successCount.set(response.data?.successCount ?? 0);
                this.snackBar.open(
                    response.message,
                    'OK',
                    { duration: 4000 }
                );
            },
            error: (err) => {
                this.uploading.set(false);
                if (err.error?.errors?.length) {
                    this.errors.set(err.error.errors);
                } else {
                    this.errors.set([err.error?.message || this.translate.instant('ERRORS.SAVE')]);
                }
            }
        });
    }

    close(): void {
        this.dialogRef.close(this.uploadComplete());
    }
}
