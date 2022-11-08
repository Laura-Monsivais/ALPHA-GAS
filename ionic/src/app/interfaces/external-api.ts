
export interface ExternalApi {
    id: number;
    function: string;
    url: string;
    method: string;
    token?: string;//nullable
    enterprise_id: number;
}