export interface OrderItem {
  productId: string;
  quantity: string;
}

export type InventoryType = 'IN' | 'OUT' | 'ADJUSTMENT';
