export interface OrderProductInterface {
  quantity_ordered: number;
  createdAt?: string;
  updatedAt?: string;
  productId: number;
  orderId: number;
}