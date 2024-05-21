export interface OrderInterface {
    id: number;
    product_id: number;
    quantity_ordered: number;
    price: number;
    date: string;
    name?: string;
}