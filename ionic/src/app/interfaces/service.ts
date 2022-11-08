
export interface Service {
    id: number;
    name: string;
    description?: string;//nullable
    cost: number;
    price: number;
    enterprise_id: number;
}