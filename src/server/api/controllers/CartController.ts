import { Request, Response } from 'express';
import { Controller } from '../../module/controller';
import { CartService } from '../services/CartService';

export class CartController extends Controller {
    private cartService: CartService;

    constructor(app) {
        super(app);

        // Because of laking dependency injection
        this.cartService = this.services.CartService as CartService;
    }

    get(req: Request, res: Response) {
        const {cartId} = req.params;
        const cart = this.cartService.findCartById(cartId);
        return res.json(cart);
    }

    post(req: Request, res: Response) {
        const {cartId} = req.params;
        const {amount, code} = req.body;
        const cart = this.cartService.addProductToCart(cartId, code, amount);
        return res.json(cart);
    }
}
