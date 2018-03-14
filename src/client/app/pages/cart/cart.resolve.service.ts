import { Injectable } from '@angular/core';
import {
	Router, Resolve,
	ActivatedRouteSnapshot
} from '@angular/router';
import { Cart } from '../../shared/cart';
import { CartService } from '../../core/services/cart/cart.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CartResolve implements Resolve<any> {
	constructor(private cartService: CartService, private router: Router) { }

	resolve(route: ActivatedRouteSnapshot) {
		const id = +route.params['id'];
		return this.cartService.getCart("1");
	}
}