import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { XLSXService } from '../../service/xlsx.service';
import { AccountService } from '../../service/account.service';

@Component({
    templateUrl: './account-import.template.html',
    styleUrls: ['./account-import.styles.scss'],
})
export class AccountImportComponent implements OnInit, OnDestroy {

    private accountSubscription: any;
    private account: any;
    step: number;
    worksheet: any;

    constructor (
        private location: Location,
        private router: Router,
        private zone: NgZone,
        private xlsx: XLSXService,
        private accountService: AccountService,
    ) {
        
    }

    ngOnInit () {

        console.log('Account Import onInit');

        this.step = 0;

        this.accountSubscription = this.accountService.account.subscribe(
            account => {
                this.zone.run( () => {
                    this.account = account;                    
                });
            }
        );

    }

    ngOnDestroy () {
        this.accountSubscription.unsubscribe();
    }

    onNextStep () {

        let self = this;

        this.zone.run(function () {
            self.step++;

            if (self.step === 1) {

                self.worksheet = self.xlsx.getLastImport();
                console.log('Worksheet account-import', self.worksheet);

            }
        })
    }

    onConfirmatonStep () {
        this.router.navigate(['account', this.account._id, 'transactions']);
    }

    onCancel () {
        this.step=0;
        this.location.back();
    }
}