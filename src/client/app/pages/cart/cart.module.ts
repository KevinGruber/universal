import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '', component: CartComponent, pathMatch: 'full' }
    ])
  ]
})
export class CartModule { }
