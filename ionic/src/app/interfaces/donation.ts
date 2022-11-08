
export interface Donation {
    id: number;
    name: string;
    realized_at: string;
    enterpriseId: number;
    businessId: number;
    subsidiaryId: number;
    categoryId: number;
    productId: number;
    productUnit: string;
    inventory_id: number;
    inventoryTheoretical: number; 
    quantity: number;
    cost: number;
    total: number;
}