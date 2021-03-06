import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule, MatButtonModule, MatCommonModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { ProductComponent } from './components/product/product.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CartService } from './services/cart/cart.service';
import { CMSService } from './services/cms/cms.service';
import { NotFoundService } from 'app/core/services/not-found/not-found.service';

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
        ProductComponent,
        MatButtonModule
    ],
    providers: [CartService, CMSService, NotFoundService]
})
export class CoreModule {
}
