import { Injectable } from '@angular/core';

import * as Datastore  from 'nedb';

@Injectable()
export class DBService {

    db: Datastore;
    
    constructor() {
        console.log('DBService constructor');
    }

    loadDB() {

        if (!this.db) {
            console.log('DBService loadDB');
            
            this.db = new Datastore({ filename: './db.json', autoload: true });
        }

        return this.db;
    }

    getDB() {
        return this.db;
    }

}
