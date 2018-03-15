import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { Product } from '../../shared/product';

@Component({
    selector: 'rlt-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    public message: string;
    public product: Product;

    constructor(private http: HttpClient, private title: Title) { }

    ngOnInit() {
        this.message = 'Hello';
        this.title.setTitle('Home Component');
        this.http.get<Product>(`${environment.server}/v1/product/12345`).subscribe(
            product => {
                this.product = product;
            },
            (error: HttpErrorResponse) => {
                console.error('cant get product', error.name);
            }
        );
    }
}
