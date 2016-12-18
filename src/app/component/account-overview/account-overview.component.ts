import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';

import { Account } from '../../model/account';
import { AccountService } from '../../service/account.service';

import logger from '../../logger';

@Component ({
    selector: 'account-overview',
    templateUrl: './account-overview.template.html',
    styles: ['./account-overview.styles.scss']
})
export class AccountOverviewComponent implements OnInit, OnDestroy {

    account: Account;
    private accountSubscription: any;

    constructor (
        private accountService: AccountService,
        private zone: NgZone,
    ) {

    }

    ngOnInit () {

        logger.debug('account-overview ngOnInit()');

        this.accountSubscription = this.accountService.account.subscribe(
            account => {
                logger.debug('Account-Overview Component, new account', account);
                this.zone.run( () => {
                    this.account = account;
                });
            }
        );

    }

    ngOnDestroy () {
        this.accountSubscription.unsubscribe();
    }
};