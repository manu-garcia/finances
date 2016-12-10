import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params, Routes } from '@angular/router';

import { DBService } from '../../service/db.service';
import { Account } from '../../model/account';

@Component({
    selector: 'account-component',
    templateUrl: './account.template.html',
    styleUrls: ['./account.styles.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {

    account: Account;
    id: string;
    private sub: any;

    constructor (
        private dbService: DBService,
        private route: ActivatedRoute,
        private router: Router,
        private zone: NgZone
    ) {
    }

    ngOnInit(): void {

        let self = this;

        this.sub = this.route.params.subscribe(params => {

            this.id = params['id'];

            let db = this.dbService.getDB();
            db.findOne({_id: this.id}, (err, data) => {
                self.zone.run( () => {
                    self.account = data as Account;
                });
            });

        });

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
