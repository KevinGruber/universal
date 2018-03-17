import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'rlt-lazy-view',
    templateUrl: './lazy.component.html'
})
export class LazyComponent implements OnInit {

    constructor(private title: Title) { }

    ngOnInit() {
        this.title.setTitle('Lazy Component');
    }
}