import { Component, Input } from '@angular/core';
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
