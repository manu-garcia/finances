import { Component } from '@angular/core';

@Component ({
    selector: 'app-component',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor () {
        console.log('AppComponent constructor');
    }
}