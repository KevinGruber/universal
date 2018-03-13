import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rlt-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [
    './toolbar.component.scss'
  ]
})
export class ToolbarComponent implements OnInit {
  @Input() title = 'Test Shop';

  constructor() { }

  ngOnInit() {
  }

}
