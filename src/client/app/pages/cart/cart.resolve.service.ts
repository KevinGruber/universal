import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CartService } from 'app/core/services/cart/cart.service';

@Injectable()
export class CartResolve implements Resolve<any> {
    constructor(private cartService: CartService) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.params['id'];
        return this.cartService.getCart(id);
    }
}