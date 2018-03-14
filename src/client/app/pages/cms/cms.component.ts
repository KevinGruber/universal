import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Cart } from '../../shared/cart';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators/map';
import { CMSData } from '../../shared/cms';
import { CMSService } from '../../core/services/cms/cms.service';

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
