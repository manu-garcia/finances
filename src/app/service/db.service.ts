import { Injectable } from '@angular/core';

import * as Datastore  from 'nedb';

import logger from '../logger';

@Injectable()
export class DBService {

    db: Datastore;
    
    constructor() {
        logger.debug('DBService constructor');
    }

    loadDB() {

        if (!this.db) {
            logger.debug('DBService loadDB');
            
            this.db = new Datastore({ filename: './db/db.json', autoload: true });
        }

        return this.db;
    }

    getDB() {
        return this.db;
    }

}
