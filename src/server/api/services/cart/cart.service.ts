import { Service } from 'module/classes/service';
import { ProductService } from 'api/services';

export class CartService extends Service {
    private readonly productService: ProductService;
    private products: Array<any> = [];
    private cartId = '451-5658-5626-895';

    constructor(app) {
        super(app);

        this.productService = this.services.ProductService as ProductService;
        this.products = [this.productService.findById('12345')];
    }

    findCartById(cartId: string) {
        if (cartId !== this.cartId) {
            return null;
        }

        return {
            cartId,
            products: this.products
        };
    }

    addProductToCart(cartId: string, productCode: string) {
        if (cartId !== this.cartId) {
            return null;
        }

        const product = this.productService.findById(productCode);

        if (!product) {
            return null;
        }

        this.products = [
            product,
            ...this.products
        ];
        return {
            cartId,
            products: this.products
        };
    }

    removeProductFromCart(cartId: string, productCode: string) {
        if (cartId !== this.cartId) {
            return null;
        }

        const products = [...this.products];
        this.products = products.filter(p => p.id === productCode);
        return {
            cartId,
            products: this.products
        };
    }

    clearCart(cartId: string) {
        if (cartId !== this.cartId) {
            return null;
        }

        this.products = [];
        return {
            cartId,
            products: []
        };
    }
}
