import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { DBService } from './db.service';
import { Account } from '../model/account';

@Injectable()
export class AccountService {

    private accountSource: BehaviorSubject<Account> = new BehaviorSubject(undefined);
    public account: Observable<Account> = this.accountSource.asObservable();

    private accountsSource = new BehaviorSubject<Account[]>([]);
    public accounts: Observable<Account[]> = this.accountsSource.asObservable();

    constructor (
        private dbService: DBService,
    ) {
        console.log('Account Service constructor');
    }

    populateAccount (id) {
        
        let self = this;
        // Improve this. It should be here
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

            self.accountSource.next(newAccount);

            if (typeof fn == 'function') fn(err, newAccount);
        })

    }

}