import { Component, OnInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

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
    subscription: Subscription;

    constructor (
        private dbService: DBService,
        private zone: NgZone
    ) {

    }

    ngOnInit(): void {

        let db = this.dbService.loadDB();
        let self = this;

        this.subscription = this.dbService.accounts$.subscribe(accounts => {
            self.zone.run(() => {
                self.accounts = accounts;
            });
        });

    }

    getNAccounts(): number {
        return this.accounts && this.accounts.length ? this.accounts.length : 0;
    }

}