export interface Selfconsumption {
  id: number;
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
  route_id: number;
  start: string;
  end: string;
  initial_mileage: number;
  end_mileage: number;
  performance: number;
}
