import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'app/shared/cart';
import { Observable } from 'rxjs/Observable';
import { CartService } from '../../services/cart/cart.service';

@Component({
    selector: 'rlt-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: [
        './toolbar.component.scss'
    ]
})
export class ToolbarComponent implements OnInit {
    @Input() title = 'Test Shop';

    public cart$: Observable<Cart>;

    constructor(private cartService: CartService, private router: Router) { }

    ngOnInit() {
        this.cart$ = this.cartService.getCart('1');
    }

    openCart() {
        // alert(`Cart opened with ${this.cartService.productsInCart} products and id: ${this.cartService.cart.cartId}`)
        this.router.navigate(['/cart']);
    }

}
