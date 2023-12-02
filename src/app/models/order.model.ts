import { Product } from "./product.model";

export interface OrderItem {
    product: Product;  
    quantity: number;
}

export interface Order {
    items: OrderItem[];
    total: number;
    itemCount: number;
}