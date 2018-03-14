import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '../../../shared/product';

@Component({
  selector: 'rlt-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product: Product;
}
