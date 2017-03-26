import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { DBService } from './db.service';
import { Account } from '../model/account';

import logger from '../logger';

@Injectable()
export class AccountService {

    private accountSource: BehaviorSubject<Account> = new BehaviorSubject(undefined);
    public account: Observable<Account> = this.accountSource.asObservable();

    private accountsSource = new BehaviorSubject<Account[]>([]);
    public accounts: Observable<Account[]> = this.accountsSource.asObservable();

    constructor (
        private dbService: DBService,
    ) {
        logger.debug('Account Service constructor');
    }

    populateAccount (id) {
        
        let self = this;
        // Improve this. It should be here
        let db = this.dbService.loadDB();

        db.findOne({_id: id}, (err, data) => {
            logger.debug('Account Service, found and populating', data);
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

    updateAccount (id, fieldsObject, fn) {
        let self = this;

        this.dbService.db.update({ _id: id}, { $set: fieldsObject }, {}, (err, numReplaced) => {

            logger.debug('Account updated!');

            self.populateAccount(id);

            if (typeof fn == 'function') fn(err, numReplaced);
        });
    }

    addStatements (id, statements) {
        let self: any = this;

        return new Promise((resolve, reject) => {

            self.dbService.db.update({ _id: id }, { $push: { statements: statements }}, {}, (err, numUpdated) => {
                
                if (err) reject();

                resolve(numUpdated);
            });    
        });
    }

}