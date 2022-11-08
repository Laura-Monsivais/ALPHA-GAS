
export interface Product {
    id: number;
    name: string;
    image?: string;//nullable
    imageFile?: any;//nullable
    description?: string;//nullable
    content?: number;//nullable
    unit: string;
    cost: number;
    price: number;
    enterpriseId: number;
    business_id: number;
    category_id: number;
    inventoryId: number;
    inventoryTheoretical: number;
}