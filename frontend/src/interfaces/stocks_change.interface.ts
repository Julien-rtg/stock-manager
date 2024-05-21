export interface StocksChangeInterface {
    id: number;
    product_id: number;
    quantity: number;
    quantity_at_time?: number;
    date: string;
}