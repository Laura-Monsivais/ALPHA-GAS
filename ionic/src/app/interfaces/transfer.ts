
export interface Transfer {
    id: number;
    key: string;
    name: string;
    enterpriseId: number;
    businessId: number;
    originId: number;
    categoryId: number;
    productId: number;
    productUnit: string;
    inventory_id: number;
    inventoryTheoretical: number; 
    quantity: number;
    destination_id: number;
}