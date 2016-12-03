import { Component, OnInit } from '@angular/core';
import { DBService } from '../../service/db.service';

@Component ({
    selector: 'app-component',
    templateUrl: './app.template.html',
    styleUrls: ['./app.styles.scss'],
    providers: [ DBService ]
})
export class AppComponent implements OnInit {

    constructor (private dbService: DBService) {

    }

    ngOnInit(): void {

        let db = this.dbService.loadDB();

    }
}