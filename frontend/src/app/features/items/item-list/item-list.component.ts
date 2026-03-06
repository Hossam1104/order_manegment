import { Component, OnInit, inject, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

import { ItemDto } from '../../../core/models/item.model';
import { ItemService } from '../../../core/services/item.service';
import { CartService } from '../../../core/services/cart.service';
import { ItemFormComponent } from '../item-form/item-form.component';
import { BulkUploadComponent } from '../bulk-upload/bulk-upload.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-item-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatChipsModule,
        MatProgressBarModule,
        MatDialogModule,
        MatSnackBarModule,
        TranslateModule,
        RouterLink
    ],
    templateUrl: './item-list.component.html',
    styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnInit, OnDestroy {
    private itemService = inject(ItemService);
    private cartService = inject(CartService);
    private dialog = inject(MatDialog);
    private snackBar = inject(MatSnackBar);
    private translate = inject(TranslateService);
    private destroy$ = new Subject<void>();
    private searchSubject = new Subject<string>();

    items = signal<ItemDto[]>([]);
    loading = signal(false);
    totalCount = signal(0);
    page = signal(1);
    pageSize = signal(10);
    searchQuery = signal('');

    displayedColumns = ['image', 'itemCode', 'name', 'category', 'price', 'vatPercentage', 'netTotal', 'createdAt', 'actions'];

    currentLang = computed(() => this.translate.currentLang || 'en');

    ngOnInit(): void {
        this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            takeUntil(this.destroy$)
        ).subscribe((search: string) => {
            this.searchQuery.set(search);
            this.page.set(1);
            this.loadItems();
        });

        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadItems(): void {
        this.loading.set(true);
        this.itemService.getItems(this.page(), this.pageSize(), this.searchQuery() || undefined)
            .subscribe({
                next: (response) => {
                    if (response.success && response.data) {
                        this.items.set(response.data.items.map((item: ItemDto) => ({
                            ...item,
                            imageUrl: this.itemService.getImageUrl(item.imagePath)
                        })));
                        this.totalCount.set(response.data.totalCount);
                    }
                    this.loading.set(false);
                },
                error: () => {
                    this.loading.set(false);
                }
            });
    }

    onSearchChange(value: string): void {
        this.searchSubject.next(value);
    }

    onPageChange(event: PageEvent): void {
        this.page.set(event.pageIndex + 1);
        this.pageSize.set(event.pageSize);
        this.loadItems();
    }

    onSortChange(sort: Sort): void {
        this.loadItems();
    }

    addToCart(item: ItemDto): void {
        this.cartService.addItem(item);
        this.snackBar.open(
            this.translate.instant('ITEMS.ADD_TO_CART') + ' ✓',
            'OK',
            { duration: 2000 }
        );
    }

    openAddDialog(): void {
        const dialogRef = this.dialog.open(ItemFormComponent, {
            width: '600px',
            data: null
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.loadItems();
            }
        });
    }

    openEditDialog(item: ItemDto): void {
        const dialogRef = this.dialog.open(ItemFormComponent, {
            width: '600px',
            data: item
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.loadItems();
            }
        });
    }

    confirmDelete(item: ItemDto): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: this.translate.instant('ITEMS.DELETE'),
                message: this.translate.instant('ITEMS.DELETE_CONFIRM')
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.itemService.deleteItem(item.id).subscribe({
                    next: () => {
                        this.loadItems();
                        this.snackBar.open(
                            this.translate.instant('ITEMS.DELETE') + ' ✓',
                            'OK',
                            { duration: 2000 }
                        );
                    }
                });
            }
        });
    }

    openBulkUploadDialog(): void {
        const dialogRef = this.dialog.open(BulkUploadComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().subscribe((uploaded: boolean) => {
            if (uploaded) {
                this.loadItems();
            }
        });
    }

    getName(item: ItemDto): string {
        return this.currentLang() === 'ar' ? item.nameAR : item.nameEN;
    }
}
