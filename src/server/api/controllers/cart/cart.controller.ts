import { Request, Response } from 'express';
import { Controller } from 'module/classes/controller';
import { CartService } from 'api/services';

export class CartController extends Controller {
    private cartService: CartService;

    constructor(app) {
        super(app);

        // Because of laking dependency injection
        this.cartService = this.services.CartService as CartService;
    }

    getCart(req: Request, res: Response) {
        const {cartId} = req.params;
        const cart = this.cartService.findCartById(cartId);
        return res.json(cart);
    }

    deleteCart(req: Request, res: Response) {
        const {cartId} = req.params;
        const cart = this.cartService.clearCart(cartId);
        if (!cart) {
            return res.status(404).send('Not found');
        }
        return res.json(cart);
    }

    postEntry(req: Request, res: Response) {
        const {cartId} = req.params;
        const {code} = req.body;
        const cart = this.cartService.addProductToCart(cartId, code);
        if (!cart) {
            return res.status(404).send('Not found');
        }
        return res.json(cart);
    }

    deleteEntry(req: Request, res: Response) {
        const {cartId, code} = req.params;
        const cart = this.cartService.removeProductFromCart(cartId, code);
        if (!cart) {
            return res.status(404).send('Not found');
        }
        return res.json(cart);
    }
}
