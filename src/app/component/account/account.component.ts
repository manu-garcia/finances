import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params, Routes } from '@angular/router';

import { AccountService } from '../../service/account.service';
import { ElectronService } from '../../service/electron.service';
import { XLSXService } from '../../service/xlsx.service';

import { Account } from '../../model/account';

import logger from '../../logger';

@Component({
    selector: 'account-component',
    templateUrl: './account.template.html',
    styleUrls: ['./account.styles.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {

    account: Account;
    id: string;
    private urlSubscription: any;
    private accountSubscription: any;

    constructor (
        private xlsx: XLSXService,
        private electron: ElectronService,
        private accountService: AccountService, 
        private route: ActivatedRoute,
        private router: Router,
        private zone: NgZone
    ) {
    }

    ngOnInit(): void {

        let self = this;

        this.accountSubscription = this.accountService.account.subscribe(
            account => {
                logger.debug('Account Component, new account', account);

                this.zone.run( () => {
                    this.account = account;
                });
            }
        );

        this.urlSubscription = this.route.params.subscribe(
            params => {
                
                this.id = params['id'];

                logger.debug('Account Component, new url', this.id);

                this.accountService.populateAccount(this.id);

            }
        );

    }

    ngOnDestroy() {
        this.urlSubscription.unsubscribe();
        this.accountSubscription.unsubscribe();
    }

    selectFileToImport() {

        let self = this;

        this.electron.showSpreadsheetOpenDialog( fileNames => {
            logger.debug('Spreadsheet to import from: ', fileNames);

            let spreadsheet = this.xlsx.parseXLSX(fileNames[0]);

            self.router.navigate(['account', self.id, 'account-import']);

        });
    }

}
