import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule, MatButtonModule, MatCommonModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { ProductComponent } from './components/product/product.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CartService } from './services/cart/cart.service';
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
export class CoreModule {
}
