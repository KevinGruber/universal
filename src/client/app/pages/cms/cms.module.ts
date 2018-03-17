import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { CMSComponent } from './cms.component';
import { SlotComponent } from './slot/slot.component';

@NgModule({
    declarations: [CMSComponent, SlotComponent],
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild([
            {path: '', component: CMSComponent, pathMatch: 'full'}
        ])
    ]
})
export class CMSModule {
}
