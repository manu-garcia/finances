import { Component, OnInit, NgZone } from '@angular/core';
import { DBService } from '../../service/db.service';

import { Account } from '../../model/account';

@Component ({
    selector: 'app-component',
    templateUrl: './app.template.html',
    styleUrls: ['./app.styles.scss'],
    providers: [ DBService ]
})
export class AppComponent implements OnInit {

    accounts : Account[];

    constructor (private dbService: DBService, private zone: NgZone) {
    }

    ngOnInit(): void {

        let db = this.dbService.loadDB();
        let self = this;

        db.find({}, function(err, data) {

            self.setAccounts(data);

        });

    }

    setAccounts(data): void {

        this.zone.run(() => {
            this.accounts = data;
        });

    }

    getNAccounts(): number {
        return this.accounts && this.accounts.length ? this.accounts.length : 0;
    }
    

}