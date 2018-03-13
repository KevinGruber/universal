import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../shared/product';

@Component({
  selector: 'rlt-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public message: string;
  public product: Product;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.message = 'Hello';
    this.http.get<Product>(`jsapi/v1/product/12345`).subscribe(
      product => {
        this.product = product;
      },
      (error: HttpErrorResponse) => {
        console.error('cant get product', error.error, error.name, error.status, error.statusText, error.type, error.url);
      }
    );
  }
}
