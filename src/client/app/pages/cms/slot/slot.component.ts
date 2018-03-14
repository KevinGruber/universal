import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators/map';
import { CMSSlot } from '../../../shared/cms';

@Component({
  selector: 'rlt-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent {
  @Input() slot: CMSSlot;

  constructor() { }

}
