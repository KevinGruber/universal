import { HomeComponent } from './home/home.component';

export const APP_ROUTING = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' },
  { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule' }
];
