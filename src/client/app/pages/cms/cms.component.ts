import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { map } from 'rxjs/operators/map';
import { CMSData } from '../../shared/cms';

@Component({
    selector: 'rlt-cms',
    templateUrl: './cms.component.html',
    styleUrls: ['./cms.component.scss']
})
export class CMSComponent implements OnInit {
    public cms$: Observable<CMSData>;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.cms$ = this.route.data
            .pipe(
                map((data: { cms: CMSData }) => {
                    return data.cms;
                }));
    }

}
