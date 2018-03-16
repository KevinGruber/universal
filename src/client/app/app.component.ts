import { Component } from '@angular/core';

@Component({
    selector: 'rlt-root',
    template: `
        <rlt-toolbar [title]="'Universal Demo using Angular and Angular CLI'"></rlt-toolbar>
        <div class="nav-buttons">
            <a mat-raised-button color="primary" routerLink="/">Home</a>
            <a mat-raised-button color="primary" routerLink="/cp/content1">Content 1</a>
            <a mat-raised-button color="primary" routerLink="/cp/content2">Content 2</a>
            <a mat-raised-button color="primary" routerLink="/lazy">Lazy</a>
            <a mat-raised-button color="primary" routerLink="/lazy/nested">Lazy_Nested</a>
        </div>
        <div class="content-wrapper">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: [`
        .content-wrapper,
        .nav-buttons {
            margin: 5px 15px 15px 15px;
        }

        .content-wrapper {
            margin-top: 15px;
        }
    `]
})
export class AppComponent {

}
