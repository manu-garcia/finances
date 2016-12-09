import { Currency } from './currency';

export class Account {
    
    constructor (
        public name: string,
        public currency: Currency,
        public _id?: string        
    ) {

    }

}