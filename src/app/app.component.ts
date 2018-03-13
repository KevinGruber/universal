import { Component } from '@angular/core';

@Component({
  selector: 'rlt-root',
  template: `
      <rlt-toolbar [title]="'Universal Demo using Angular and Angular CLI'"></rlt-toolbar>
      <a routerLink="/">Home</a>
      <a routerLink="/lazy">Lazy</a>
      <a routerLink="/lazy/nested">Lazy_Nested</a>
      <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {

}
