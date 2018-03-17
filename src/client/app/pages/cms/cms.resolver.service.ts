import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { CMSService } from '../../core/services/cms/cms.service';

@Injectable()
export class CMSResolve implements Resolve<any> {
    constructor(private cmsService: CMSService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot) {
        const code = route.params['code'];
        return this.cmsService.getCMSData(code);
    }
}