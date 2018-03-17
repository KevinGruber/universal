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
    public cartID: string = '451-5658-5626-895';


    constructor(private cartService: CartService, private router: Router) { }

    ngOnInit() {
        this.cart$ = this.cartService.getCart(this.cartID);
    }

    openCart() {
        this.router.navigate(['/cart', this.cartID]);
    }

}
