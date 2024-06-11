export interface StocksChangeInterface {
    id: number;
    productId: number;
    quantity: number;
    quantity_at_time?: number;
    createdAt: string;
    updatedAt: string;
    formatedDate?: string;
}