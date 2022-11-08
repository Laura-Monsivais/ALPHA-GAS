export interface Inventory {
  id: number;
  subsidiary_id: number;
  product_id: number;
  productUnit: string;
  productCost: number;
  inventory_theoretical: number;
  inventory_real: number;
  inventory_difference: number;
  buys: number;
  sales: number;
  selfconsumptions: number;
  donations: number;
  earnings: number;
}
