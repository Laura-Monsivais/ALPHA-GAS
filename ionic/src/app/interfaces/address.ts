
export interface Address {
    id: number;
    name: string;  
    street: string;
    exterior: string;
    interior?: string;//nullable
    postal_code: string;
    neighborhood: string;
    city: string;
    municipality: string;
    state: string;
    country: string;
    references?: string;//nullable
    client_id: number;
}