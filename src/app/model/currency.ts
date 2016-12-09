export enum TCurrency {GBP, EUR};

export interface Currency {

    id: TCurrency;
    name: string;
    symbol: string;

}

export let GBP:Currency = {id: TCurrency.GBP, name: 'GBP', symbol: '£'};
export let EUR:Currency = {id: TCurrency.EUR, name: 'EUR', symbol: '€'};

export let Currencies: Currency[] = [GBP, EUR];
