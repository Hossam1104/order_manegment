import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { ItemDto, CreateItemRequest, UpdateItemRequest } from '../../../core/models/item.model';
import { ItemService } from '../../../core/services/item.service';

@Component({
    selector: 'app-item-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatSnackBarModule,
        MatProgressBarModule,
        TranslateModule
    ],
    templateUrl: './item-form.component.html',
    styleUrl: './item-form.component.scss'
})
export class ItemFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private dialogRef = inject(MatDialogRef<ItemFormComponent>);
    private itemService = inject(ItemService);
    private snackBar = inject(MatSnackBar);
    private translate = inject(TranslateService);

    data = inject<ItemDto | null>(MAT_DIALOG_DATA);

    form!: FormGroup;
    saving = signal(false);
    selectedFile: File | null = null;
    imagePreviewUrl: string | null = null;
    imageError: string | null = null;
    computedNetTotal = signal(0);

    get isEdit(): boolean {
        return this.data !== null;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            itemCode: [
                this.data?.itemCode || '',
                [Validators.required, Validators.maxLength(50)],
                [this.uniqueCodeValidator()]
            ],
            nameEN: [this.data?.nameEN || '', [Validators.required, Validators.maxLength(200)]],
            nameAR: [this.data?.nameAR || '', [Validators.required, Validators.maxLength(200)]],
            category: [this.data?.category || '', [Validators.maxLength(100)]],
            price: [this.data?.price || 0, [Validators.required, Validators.min(0)]],
            vatPercentage: [this.data?.vatPercentage ?? 0, [Validators.required]]
        });

        if (this.data?.imageUrl) {
            this.imagePreviewUrl = this.itemService.getImageUrl(this.data.imagePath);
        }

        this.form.valueChanges.subscribe(() => {
            this.updateNetTotal();
        });
        this.updateNetTotal();
    }

    private updateNetTotal(): void {
        const price = this.form?.get('price')?.value || 0;
        const vat = this.form?.get('vatPercentage')?.value || 0;
        this.computedNetTotal.set(price + (price * vat / 100));
    }

    uniqueCodeValidator(): (control: AbstractControl) => Observable<ValidationErrors | null> {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value || control.value.length === 0) {
                return of(null);
            }

            return timer(400).pipe(
                switchMap(() => {
                    const excludeId = this.data?.id;
                    return this.itemService.checkCode(control.value, excludeId).pipe(
                        map((response: { success: boolean; data: boolean }) => {
                            if (response.success && response.data === true) {
                                return null;
                            }
                            return { codeTaken: true };
                        }),
                        catchError(() => of(null))
                    );
                })
            );
        };
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];
        this.imageError = null;

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            this.imageError = this.translate.instant('FORM.IMAGE_TYPE');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            this.imageError = this.translate.instant('FORM.IMAGE_SIZE');
            return;
        }

        this.selectedFile = file;

        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreviewUrl = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    onSave(): void {
        if (this.form.invalid || this.form.pending) return;

        this.saving.set(true);
        const formValue = this.form.value;

        if (this.isEdit) {
            const request: UpdateItemRequest = {
                itemCode: formValue.itemCode,
                nameEN: formValue.nameEN,
                nameAR: formValue.nameAR,
                category: formValue.category,
                price: formValue.price,
                vatPercentage: formValue.vatPercentage,
                imagePath: this.data!.imagePath || undefined
            };

            this.itemService.updateItem(this.data!.id, request).subscribe({
                next: (response) => {
                    if (response.success && this.selectedFile && response.data) {
                        this.uploadImageAndClose(response.data.id);
                    } else {
                        this.saving.set(false);
                        this.snackBar.open(this.translate.instant('ITEMS.EDIT') + ' ✓', 'OK', { duration: 2000 });
                        this.dialogRef.close(true);
                    }
                },
                error: () => {
                    this.saving.set(false);
                }
            });
        } else {
            const request: CreateItemRequest = {
                itemCode: formValue.itemCode,
                nameEN: formValue.nameEN,
                nameAR: formValue.nameAR,
                category: formValue.category,
                price: formValue.price,
                vatPercentage: formValue.vatPercentage
            };

            this.itemService.createItem(request).subscribe({
                next: (response) => {
                    if (response.success && this.selectedFile && response.data) {
                        this.uploadImageAndClose(response.data.id);
                    } else {
                        this.saving.set(false);
                        this.snackBar.open(this.translate.instant('ITEMS.ADD') + ' ✓', 'OK', { duration: 2000 });
                        this.dialogRef.close(true);
                    }
                },
                error: () => {
                    this.saving.set(false);
                }
            });
        }
    }

    private uploadImageAndClose(itemId: string): void {
        if (!this.selectedFile) {
            this.saving.set(false);
            this.dialogRef.close(true);
            return;
        }

        this.itemService.uploadImage(itemId, this.selectedFile).subscribe({
            next: () => {
                this.saving.set(false);
                const key = this.isEdit ? 'ITEMS.EDIT' : 'ITEMS.ADD';
                this.snackBar.open(this.translate.instant(key) + ' ✓', 'OK', { duration: 2000 });
                this.dialogRef.close(true);
            },
            error: () => {
                this.saving.set(false);
                this.snackBar.open(this.translate.instant('ERRORS.UPLOAD'), 'OK', { duration: 3000 });
                this.dialogRef.close(true);
            }
        });
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
