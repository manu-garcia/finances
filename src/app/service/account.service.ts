import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DBService } from './db.service';
import { Account } from '../model/account';

@Injectable()
export class AccountService {

    private accountSource = new Subject<Account>();
    account$ = this.accountSource.asObservable();

    private accountsSource = new BehaviorSubject<Account[]>([]);
    accounts$ = this.accountsSource.asObservable();

    constructor (
        private dbService: DBService,
    ) {

    }

    populateAccount (id) {
        
        let self = this;
        let db = this.dbService.loadDB();

        db.findOne({_id: id}, (err, data) => {
            console.log('Account Service, found and populating', data);
            self.accountSource.next(data as Account); 
        });

    }

    populateAccounts() {

        let self = this;

        this.dbService.loadDB().find({}, function(err, data) {

            self.accountsSource.next(data);

        });

    }

    createAccount (account, fn) {

        let self = this;

        this.dbService.db.insert(account, function (err, newAccount) {

            self.populateAccounts();

            if (typeof fn == 'function') fn(err, newAccount);
        })

    }

}