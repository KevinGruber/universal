import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from 'client/app/shared/cart';
import { environment } from 'client/environments/environment';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators/delay';
import { retry } from 'rxjs/operators/retry';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class CartService {
    private _cart$: Observable<Cart>;

    get cart$() {
        return this._cart$;
    }
    public productsInCart: number = 0;

    constructor(private http: HttpClient) { }

    private _cart: Cart;

    get cart() {
        if (!this._cart) {
            return {
                cartId: '-1',
                products: []
            };
        }
        return this._cart;
    }

    getCart(cartId: string) {
        this._cart$ = this.http.get<Cart>(`${environment.server}/v1/cart/${cartId}`).pipe(
            tap((cart) => {
                this._cart = cart;
                this.productsInCart = cart.products.length;
            }, delay(2000)),
            retry(3)
        );
        return this._cart$;
    }

}
