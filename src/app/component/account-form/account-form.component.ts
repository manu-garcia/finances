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
    submitted = false;
    form = undefined;

    currency: Currency.Currency = undefined;
    name: string = '';
    id: string = undefined;

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

                    this.id = account._id;
                    this.name = account.name;

                    // ngFor object identity based on === operator. Problems having trackBy to work
                    // this.currency = account.currency;
                    this.currency = Currency.Currencies[account.currency.id];
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

        console.log('account-form: onSubmit()', this.name, this.currency);
        if (!this.id) {

            // Create new account
            this.accountService.createAccount({name: this.name, currency: this.currency}, function (err, newAccount) {
                form.reset();
                self.router.navigate(['account', newAccount._id]);
            })

        } else {

            // Edit current account
            console.log('Editing account on submit', this.id);
            this.accountService.updateAccount(this.id, { name: this.name, currency: this.currency }, (err, numReplaced) => {
                form.reset();
                self.router.navigate(['account', this.id]);
            });
        }

        this.submitted = true;
    }

    onCancel(form) {
        form.reset();
        this.location.back();
    }

    trackCurrency(index, currency) {
        return currency ? currency.id : undefined;
    }

}