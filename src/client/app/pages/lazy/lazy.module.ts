import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { LazyComponent } from './lazy.component';

@NgModule({
  declarations: [LazyComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '', component: LazyComponent, pathMatch: 'full' }
    ])
  ]
})
export class LazyModule {}
