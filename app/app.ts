import { bootstrap } from 'angular2/platform/browser';
import { Component } from 'angular2/core';

@Component({
    selector: 'app',
    template: 'Angular 2 works!!'
})

export class App {
    constructor () {}
}

bootstrap(App);