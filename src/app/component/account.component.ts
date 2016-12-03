import { Component, OnInit } from '@angular/core';
import { DBService } from '../service/db.service';

@Component({
    selector: 'account-component',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    constructor (private dbService: DBService) {

    }

    ngOnInit(): void {

        let db = this.dbService.getDB();

    }
}
