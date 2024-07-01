import { ProductInterface } from "./product.interface";

export interface OrderInterface {
    id: number;
    total_price: number;
    createdAt?: string;
    updatedAt?: string;
    products: ProductInterface[];
}