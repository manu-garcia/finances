import { Component, OnInit } from '@angular/core';

import { DBService } from '../../service/db.service';

import { Account } from '../../model/account';

@Component({
    selector: 'account-form-component',
    templateUrl: './account-form.template.html',
    styleUrls: ['./account-form.styles.scss']
})
export class AccountFormComponent implements OnInit {

    currencies = ['GBP', 'EUR'];
    model = new Account(null, '', '');
    submitted = false;
    form = undefined;

    constructor (private dbService: DBService) {

    }

    ngOnInit(): void {

    }

    onSubmit(form) {
        console.log('Form submitted', this);

        if (!this.model.id) {

            // Create new account
            this.dbService.getDB().insert(this.model, function(err, newAccount) {
                console.log('New account created ', newAccount);
                form.reset();
            })

        } else {

            // Edit current account

        }

        this.submitted = true;
    }

    onCancel(form) {
        form.reset();
    }

} 