import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../../../shared/cart';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { tap } from "rxjs/operators/tap";
import { retry } from "rxjs/operators/retry";
import { delay } from "rxjs/operators/delay";

@Injectable()
export class CartService {
  private _cart: Cart;
  private cart$: Observable<Cart>;

  public productsInCart: number = 0;

  constructor(private http: HttpClient) { }

  get cart(): Cart {
    if (!this._cart) {
      return {
        cartId: '-1',
        products: []
      };
    }
    return this._cart;
  }

  getCart(cartId: string) {
    return this.http.get<Cart>(`${environment.server}/v1/cart/${cartId}`).pipe(
      tap((cart) => {
        this._cart = cart;
        this.productsInCart = cart.products.length;
      }, delay(2000)),
      retry(3)
    )
  }

}
