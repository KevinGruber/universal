import { Component, OnInit } from '@angular/core';
import { NotFoundService } from 'app/core/services/not-found/not-found.service';

@Component({
    selector: 'rlt-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

    constructor(private notFoundService: NotFoundService) {}

    ngOnInit() {
        this.notFoundService.setStatus(404);
    }

}
