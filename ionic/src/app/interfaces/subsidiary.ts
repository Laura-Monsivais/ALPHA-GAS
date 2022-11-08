export interface Subsidiary {
    id: number;
    name: string; 
    is_central: boolean;
    logo?: string;//nullable
    logoFile?: any;//nullable
    overlay?: string;//nullable
    overlayFile?: any;//nullable
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
    enterpriseId: number;
    business_id: number;
}