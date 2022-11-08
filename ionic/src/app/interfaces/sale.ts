export interface Sale {
    id: number;
    enterpriseId: number;
    businessId: number;
    subsidiaryId: number;
    seller_id: number;
    client_id?: number;//nullable
    order_id?: number;//nullable
    total: number;
}
