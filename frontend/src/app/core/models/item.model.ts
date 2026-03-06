export interface ItemDto {
    id: string;
    itemCode: string;
    nameEN: string;
    nameAR: string;
    imagePath: string | null;
    imageUrl: string | null;
    category: string;
    price: number;
    vatPercentage: number;
    netTotal: number;
    createdAt: string;
    updatedAt: string | null;
}

export interface CreateItemRequest {
    itemCode: string;
    nameEN: string;
    nameAR: string;
    category: string;
    price: number;
    vatPercentage: number;
}

export interface UpdateItemRequest extends CreateItemRequest {
    imagePath?: string;
}
