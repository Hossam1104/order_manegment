import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    get client(): SupabaseClient {
        return this.supabase;
    }

    getStorageUrl(path: string): string {
        const { data } = this.supabase.storage
            .from(environment.storageBucket)
            .getPublicUrl(path);
        return data.publicUrl;
    }
}
