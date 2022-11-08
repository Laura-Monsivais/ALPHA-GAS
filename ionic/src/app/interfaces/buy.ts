export interface Buy {
    id: number;
    name: String;
    provenance?: String;//nullable
    transport?: String;//nullable
    embarked_at?: String;//nullable
    enterpriseId: number; 
    businessId: number; 
    expected_destination_id: number;
    destination_id?: number;//nullable
    downloaded_at?: String;//nullable
    total: number;
}
