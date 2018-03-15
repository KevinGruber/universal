import { Product } from './product';

export interface Cart {
    cartId: string,
    products: Array<Product>
}
