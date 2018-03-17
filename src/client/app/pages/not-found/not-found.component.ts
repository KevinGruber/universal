import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine';
import { Response } from 'express';

@Component({
    selector: 'rlt-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

    constructor(@Optional() @Inject(RESPONSE) private response: Response,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit() {
        if (!isPlatformBrowser(this.platformId)) {
            this.response.status(404);
        }
    }

}
