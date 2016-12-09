import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { DBService } from '../../service/db.service';

import { Account } from '../../model/account';
import * as Currency from '../../model/currency';

@Component({
    selector: 'account-form-component',
    templateUrl: './account-form.template.html',
    styleUrls: ['./account-form.styles.scss']
})
export class AccountFormComponent implements OnInit {

    currencies = Currency.Currencies;
    model = new Account(undefined, undefined);
    submitted = false;
    form = undefined;

    constructor (
        private dbService: DBService,
        private location: Location,
        private router: Router
    ) {

    }

    ngOnInit(): void {

    }

    onSubmit(form) {

        let self = this;

        if (!this.model._id) {

            // Create new account
            delete this.model._id;
            this.dbService.createAccount(this.model, function(err, newAccount) {
                form.reset();
                self.router.navigate(['account', newAccount._id]);
            })

        } else {

            // Edit current account

        }

        this.submitted = true;
    }

    onCancel(form) {
        form.reset();
        this.location.back();
    }

} 