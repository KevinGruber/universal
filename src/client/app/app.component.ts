import { Component } from '@angular/core';

@Component({
    selector: 'rlt-root',
    template: `
      <rlt-toolbar [title]="'Universal Demo using Angular and Angular CLI'"></rlt-toolbar>
      <a mat-raised-button color="primary" routerLink="/">Home</a>
      <a mat-raised-button color="primary" routerLink="/cp/content1">Content 1</a>
      <a mat-raised-button color="primary" routerLink="/cp/content2">Content 2</a>
      <a mat-raised-button color="primary" routerLink="/lazy">Lazy</a>
      <a mat-raised-button color="primary" routerLink="/lazy/nested">Lazy_Nested</a>
      <router-outlet></router-outlet>
  `,
    styles: []
})
export class AppComponent {

}
