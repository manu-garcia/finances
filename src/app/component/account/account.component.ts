import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params, Routes } from '@angular/router';

import { AccountService } from '../../service/account.service';

import { Account } from '../../model/account';

@Component({
    selector: 'account-component',
    templateUrl: './account.template.html',
    styleUrls: ['./account.styles.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {

    account: Account;
    id: string;
    private urlSubscription: any;
    private accountSubscription: any;

    constructor (
        private accountService: AccountService, 
        private route: ActivatedRoute,
        private router: Router,
        private zone: NgZone
    ) {
    }

    ngOnInit(): void {

        let self = this;

        this.accountSubscription = this.accountService.account.subscribe(
            account => {
                console.log('Account Component, new account', account);

                this.zone.run( () => {
                    this.account = account;
                });
            }
        );

        this.urlSubscription = this.route.params.subscribe(
            params => {
                
                this.id = params['id'];

                console.log('Account Component, new url', this.id);

                this.accountService.populateAccount(this.id);

            }
        );

    }

    ngOnDestroy() {
        this.urlSubscription.unsubscribe();
        this.accountSubscription.unsubscribe();
    }

}
