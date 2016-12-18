import { Component, OnInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DBService } from '../../service/db.service';
import { AccountService } from '../../service/account.service';

import { Account } from '../../model/account';

import logger from '../../logger';

@Component ({
    selector: 'app-component',
    templateUrl: './app.template.html',
    styleUrls: ['./app.styles.scss'],
})
export class AppComponent implements OnInit {

    accounts : Account[];
    subscription: Subscription;

    constructor (
        private dbService: DBService,
        private accountService: AccountService,
        private zone: NgZone
    ) {

    }

    ngOnInit(): void {

        let self = this;
        this.dbService.loadDB();
        this.accountService.populateAccounts();

        this.subscription = this.accountService.accounts.subscribe(accounts => {
            self.zone.run(() => {
                self.accounts = accounts;
            });
        });

    }

    getNAccounts(): number {
        return this.accounts && this.accounts.length ? this.accounts.length : 0;
    }

}