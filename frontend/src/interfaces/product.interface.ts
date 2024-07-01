import { OrderProductInterface } from "./order_products.interface";

export interface ProductInterface {
    id?: number;
    name: string;
    description: string;
    price: number;
    quantity?: number;
    deleted?: boolean;
    quantity_at_time?: number;
    order_products?: OrderProductInterface[];
}