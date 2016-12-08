import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as Datastore  from 'nedb';
import { Account } from '../model/account';

@Injectable()
export class DBService {

    db: Datastore;
    
    private accountsSource = new BehaviorSubject<Account[]>([]);
    accounts$ = this.accountsSource.asObservable();

    constructor() {}

    loadDB() {

        if (!this.db) {
            this.db = new Datastore({ filename: './db.json', autoload: true });
            this.loadAccounts();
        }

        return this.db;
    }

    getDB() {
        return this.db;
    }

    loadAccounts() {

        let self = this;

        this.db.find({}, function(err, data) {

            self.accountsSource.next(data);

        });

    }

    createAccount(model, callback) {

        let self = this;

        this.db.insert(model, function (err, docs) {
            
            self.loadAccounts();

            callback(err, docs);
        });

    }
}
