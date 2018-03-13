import {NgModule, Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import { CoreModule } from '../core/core.module';

@Component({
  selector: 'rlt-lazy-view',
  templateUrl: './lazy.component.html'
})
export class LazyComponent {}

@NgModule({
  declarations: [LazyComponent],
  imports: [
    CoreModule,
    RouterModule.forChild([
      { path: '', component: LazyComponent, pathMatch: 'full'}
    ])
  ]
})
export class LazyModule {

}
