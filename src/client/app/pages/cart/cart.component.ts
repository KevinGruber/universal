import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Cart } from '../../shared/cart';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators/map';

@Component({
  selector: 'rlt-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cart$: Observable<Cart>;

  constructor(private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.cart$ = this.route.data
      .pipe(
        map((data: { cart: Cart }) => {
          return data.cart;
        }));
  }

}
