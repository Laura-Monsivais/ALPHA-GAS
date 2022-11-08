export interface Order {
    id: number;
    enterpriseId: number;
    businessId: number;
    subsidiaryId: number;
    client_id: number;
    observation?: string;//nullable
    address_id: number;
    deliver_at: string;
    deliverAtDate: string;
    deliverAtTime: string;
    total: number;
    status: string;
    code: string;
}
