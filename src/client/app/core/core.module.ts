import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatIconModule, MatCommonModule, MatBadgeModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CartService } from './services/cart/cart.service';
import { ProductComponent } from './components/product/product.component';
import { CMSService } from './services/cms/cms.service';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCommonModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatToolbarModule
  ],
  declarations: [
    ToolbarComponent,
    ProductComponent
  ],
  exports: [
    ToolbarComponent,
    ProductComponent
  ],
  providers: [CartService, CMSService]
})
export class CoreModule { }
