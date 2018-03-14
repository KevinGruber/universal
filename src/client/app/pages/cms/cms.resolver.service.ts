import { Injectable } from '@angular/core';
import {
	Router, Resolve,
	ActivatedRouteSnapshot
} from '@angular/router';
import { Cart } from '../../shared/cart';
import { CMSService } from '../../core/services/cms/cms.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CMSResolve implements Resolve<any> {
	constructor(private cmsService: CMSService, private router: Router) { }

	resolve(route: ActivatedRouteSnapshot) {
		const code = route.params['code'];
		return this.cmsService.getCMSData(code);
	}
}