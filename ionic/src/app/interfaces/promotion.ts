
export interface Promotion {
    id: number;
    name: string;
    expires_at: string;
    price: number;
    cost: number;
    enterprise_id: number;
    business_id?: number;//nullable
    subsidiary_id?: number;//nullable
}