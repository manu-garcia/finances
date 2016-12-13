import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { AccountService } from '../../service/account.service';

import { Account } from '../../model/account';
import * as Currency from '../../model/currency';

@Component({
    selector: 'account-form-component',
    templateUrl: './account-form.template.html',
    styleUrls: ['./account-form.styles.scss']
})
export class AccountFormComponent implements OnInit, OnDestroy {

    accountSubscription: any;
    currencies = Currency.Currencies;
    account = new Account(undefined, undefined);
    submitted = false;
    form = undefined;

    constructor (
        private accountService: AccountService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute,
        private zone: NgZone,
    ) {

    }

    ngOnInit(): void {

        console.log('account-form ngOnInit()', this.route);

        if (this.route.snapshot.params['id?'] != undefined) {

            this.accountSubscription = this.accountService.account.subscribe( account => {
                this.zone.run(() => {
                    console.log("account-form account next", account);

                    this.account = account;
                });
            });

        }
    }

    ngOnDestroy(): void {
        if (this.accountSubscription) {
            this.accountSubscription.unsubscribe();
        }
    }

    onSubmit(form) {

        let self = this;

        console.log('account-form: onSubmit()', this.account);
        if (!this.account._id) {

            // Create new account
            delete this.account._id;
            this.accountService.createAccount(this.account, function (err, newAccount) {
                form.reset();
                self.router.navigate(['account', newAccount._id]);
            })

        } else {

            // Edit current account

        }

        this.submitted = true;
    }

    onCancel(form) {
        // form.reset();
        this.location.back();
    }

    trackCurrencyBy(currency) {
        console.log('trackCurrencyBy', currency);
        return currency.id;
    }

} 