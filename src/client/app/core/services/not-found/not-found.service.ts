import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class NotFoundService {
    constructor(@Optional() @Inject(RESPONSE) private response: Response) {
    }

    public setStatus(code: number, message?: string): void {
        if (this.response) {
            // this.response.status(code);
            this.response.statusCode = code;
            this.response.statusMessage = message;
        }
    }
}
