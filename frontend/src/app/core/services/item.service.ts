import { Injectable, inject } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, PagedResult } from '../models/api-response.model';
import { ItemDto, CreateItemRequest, UpdateItemRequest } from '../models/item.model';
import { SupabaseService } from './supabase.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private sb = inject(SupabaseService);

    getItems(page: number, size: number, search?: string): Observable<ApiResponse<PagedResult<ItemDto>>> {
        return from(
            this.sb.client.rpc('get_items_paged', {
                p_page: page,
                p_size: size,
                p_search: search || ''
            })
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;
                const result = data as any;
                return {
                    success: true,
                    data: {
                        items: (result.items || []).map((r: any) => this.mapRow(r)),
                        totalCount: result.totalCount ?? 0,
                        page: result.page ?? page,
                        size: result.size ?? size
                    },
                    message: '',
                    errors: []
                };
            })
        );
    }

    getItem(id: string): Observable<ApiResponse<ItemDto>> {
        return from(
            this.sb.client.from('items')
                .select('*')
                .eq('id', id)
                .eq('is_deleted', false)
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;
                return { success: true, data: this.mapRow(data), message: '', errors: [] };
            })
        );
    }

    checkCode(code: string, excludeId?: string): Observable<ApiResponse<boolean>> {
        return from((async () => {
            let query = this.sb.client.from('items')
                .select('id', { count: 'exact', head: true })
                .eq('item_code', code)
                .eq('is_deleted', false);

            if (excludeId) {
                query = query.neq('id', excludeId);
            }

            const { count, error } = await query;
            if (error) throw error;
            // true means code is available (not taken)
            return { success: true, data: (count ?? 0) === 0, message: '', errors: [] } as ApiResponse<boolean>;
        })());
    }

    createItem(request: CreateItemRequest): Observable<ApiResponse<ItemDto>> {
        return from(
            this.sb.client.from('items')
                .insert({
                    item_code: request.itemCode,
                    name_en: request.nameEN,
                    name_ar: request.nameAR,
                    category: request.category,
                    price: request.price,
                    vat_percentage: request.vatPercentage
                })
                .select()
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;
                return { success: true, data: this.mapRow(data), message: '', errors: [] };
            })
        );
    }

    updateItem(id: string, request: UpdateItemRequest): Observable<ApiResponse<ItemDto>> {
        return from(
            this.sb.client.from('items')
                .update({
                    item_code: request.itemCode,
                    name_en: request.nameEN,
                    name_ar: request.nameAR,
                    category: request.category,
                    price: request.price,
                    vat_percentage: request.vatPercentage,
                    ...(request.imagePath !== undefined ? { image_path: request.imagePath } : {})
                })
                .eq('id', id)
                .select()
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;
                return { success: true, data: this.mapRow(data), message: '', errors: [] };
            })
        );
    }

    deleteItem(id: string): Observable<void> {
        return from(
            this.sb.client.from('items')
                .update({ is_deleted: true })
                .eq('id', id)
        ).pipe(map(() => undefined));
    }

    uploadImage(id: string, file: File): Observable<ApiResponse<{ imagePath: string; imageUrl: string }>> {
        const ext = file.name.split('.').pop() || 'jpg';
        const path = `${id}.${ext}`;

        return from((async () => {
            // Upload to Supabase Storage
            const { error: uploadError } = await this.sb.client.storage
                .from(environment.storageBucket)
                .upload(path, file, { upsert: true, contentType: file.type });

            if (uploadError) throw uploadError;

            const imageUrl = this.sb.getStorageUrl(path);

            // Save the storage path on the item row
            await this.sb.client.from('items')
                .update({ image_path: imageUrl })
                .eq('id', id);

            return {
                success: true,
                data: { imagePath: imageUrl, imageUrl },
                message: '',
                errors: []
            } as ApiResponse<{ imagePath: string; imageUrl: string }>;
        })());
    }

    getImageUrl(imagePath: string | null | undefined): string | null {
        if (!imagePath) return null;
        // If it's already a full URL (Unsplash or Supabase public URL), pass through
        if (imagePath.startsWith('http')) return imagePath;
        // Legacy local paths — resolve through storage
        return this.sb.getStorageUrl(imagePath);
    }

    downloadBulkUploadTemplate(): Observable<Blob> {
        // Generate a simple CSV template client-side (no .NET backend needed)
        const header = 'ItemCode,NameEN,NameAR,Category,Price,VatPercentage';
        const sample = 'ITEM-NEW1,Sample Product,منتج تجريبي,Groceries,10,15';
        const csv = [header, sample].join('\n');
        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
        return of(blob);
    }

    bulkUpload(file: File): Observable<ApiResponse<any>> {
        return from(this.parseCsvAndInsert(file));
    }

    // ── helpers ──

    private mapRow(row: any): ItemDto {
        return {
            id: row.id,
            itemCode: row.item_code,
            nameEN: row.name_en,
            nameAR: row.name_ar,
            imagePath: row.image_path,
            imageUrl: this.getImageUrl(row.image_path),
            category: row.category,
            price: row.price,
            vatPercentage: row.vat_percentage,
            netTotal: row.net_total,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        };
    }

    private async parseCsvAndInsert(file: File): Promise<ApiResponse<any>> {
        const text = await file.text();
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length < 2) {
            return { success: false, data: null, message: 'File is empty or has no data rows', errors: ['No data rows found'] };
        }

        const rows = lines.slice(1).map(line => {
            const cols = line.split(',').map(c => c.trim());
            return {
                item_code: cols[0],
                name_en: cols[1],
                name_ar: cols[2],
                category: cols[3],
                price: parseFloat(cols[4]) || 0,
                vat_percentage: parseFloat(cols[5]) || 0
            };
        });

        const { error } = await this.sb.client.from('items').insert(rows);
        if (error) {
            return { success: false, data: null, message: error.message, errors: [error.message] };
        }

        return {
            success: true,
            data: { successCount: rows.length },
            message: `${rows.length} items imported successfully`,
            errors: []
        };
    }
}
