import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'rlt-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public message: string;

  constructor() {}

  ngOnInit() {
    this.message = 'Hello';
  }
}
