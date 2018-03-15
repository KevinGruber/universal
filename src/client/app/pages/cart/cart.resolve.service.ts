import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';

@Injectable()
export class CartResolve implements Resolve<any> {
    constructor(private cartService: CartService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = +route.params['id'];
        return this.cartService.getCart('1');
    }
}