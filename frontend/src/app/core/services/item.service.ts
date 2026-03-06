import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PagedResult } from '../models/api-response.model';
import { ItemDto, CreateItemRequest, UpdateItemRequest } from '../models/item.model';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private readonly apiUrl = 'http://localhost:5050/api/items';

    constructor(private http: HttpClient) { }

    getItems(page: number, size: number, search?: string): Observable<ApiResponse<PagedResult<ItemDto>>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        if (search) {
            params = params.set('search', search);
        }

        return this.http.get<ApiResponse<PagedResult<ItemDto>>>(this.apiUrl, { params });
    }

    getItem(id: string): Observable<ApiResponse<ItemDto>> {
        return this.http.get<ApiResponse<ItemDto>>(`${this.apiUrl}/${id}`);
    }

    checkCode(code: string, excludeId?: string): Observable<ApiResponse<boolean>> {
        let params = new HttpParams().set('code', code);
        if (excludeId) {
            params = params.set('excludeId', excludeId);
        }
        return this.http.get<ApiResponse<boolean>>(`${this.apiUrl}/check-code`, { params });
    }

    createItem(request: CreateItemRequest): Observable<ApiResponse<ItemDto>> {
        return this.http.post<ApiResponse<ItemDto>>(this.apiUrl, request);
    }

    updateItem(id: string, request: UpdateItemRequest): Observable<ApiResponse<ItemDto>> {
        return this.http.put<ApiResponse<ItemDto>>(`${this.apiUrl}/${id}`, request);
    }

    deleteItem(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    uploadImage(id: string, file: File): Observable<ApiResponse<{ imagePath: string; imageUrl: string }>> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<ApiResponse<{ imagePath: string; imageUrl: string }>>(`${this.apiUrl}/${id}/image`, formData);
    }

    getImageUrl(imagePath: string | null): string | null {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        const filename = imagePath.split('/').pop();
        return `http://localhost:5050/api/items/image/${filename}`;
    }

    downloadBulkUploadTemplate(): Observable<Blob> {
        return this.http.get(`${this.apiUrl}/bulk-upload/template`, { responseType: 'blob' });
    }

    bulkUpload(file: File): Observable<ApiResponse<any>> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<ApiResponse<any>>(`${this.apiUrl}/bulk-upload`, formData);
    }
}
