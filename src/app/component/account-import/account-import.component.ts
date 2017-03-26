import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { XLSXService } from '../../service/xlsx.service';
import { AccountService } from '../../service/account.service';
import { GridOptions } from 'ag-grid/main';
import * as _ from 'lodash';

@Component({
    templateUrl: './account-import.template.html',
    styleUrls: ['./account-import.styles.scss'],
})
export class AccountImportComponent implements OnInit, OnDestroy {

    private gridOptions: GridOptions;
    private columnDefs: any[];

    private accountSubscription: any;
    private account: any;
    private worksheet: any;

    private labels: any[];
    private labelNames: any[];

    constructor (
        private location: Location,
        private router: Router,
        private zone: NgZone,
        private xlsx: XLSXService,
        private accountService: AccountService,
    ) {
        
        this.gridOptions = {

            singleClickEdit: true,
            onGridReady: (event: any) => {

                if (event && event.api) {
                    event.api.sizeColumnsToFit();
                }

            }
            
        };

        this.labels = [
            {id: 0, name: 'Accomodation' },
            {id: 1, name: 'Food' },
            {id: 2, name: 'Out and drinks' },
            {id: 3, name: 'Travel' },
        ];

        this.labelNames = _
            .chain(this.labels)
            .orderBy('name')
            .map('name')
            .flatten()
            .value();

    }

    initGrid () {

        if (this.worksheet) {

            let self = this;
            
            this.gridOptions.columnDefs = _
                .chain(this.worksheet.headers)
                .map((header) => {
                    return {
                        headerName: header.name,
                        field: header.name,
                    }
                })
                .value();

            this.gridOptions.columnDefs.push({
                headerName: 'Label',
                field: 'label',
                editable: true,
                cellEditor: 'select',
                cellEditorParams: {
                    values: this.labelNames,
                }
            });

            this.gridOptions.rowData = _
                .chain(this.worksheet.statements)
                .map((statement) => {

                    let row = {};

                    _.forEach(statement.fields, (field) => {
                        row[field.header.name.strToLower()] = field.value;
                    });

                    return row;

                })
                .value();

        }

    }

    ngOnInit () {

        console.log('Account Import onInit');

        if(!this.worksheet) {

            console.log('Account Import onInit - worksheet');
            
            this.worksheet = this.xlsx.getLastImport();
            console.log(this.worksheet);
            this.initGrid();
        }

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

    onConfirmaton () {
        let self: any = this;
        let statements: {}[] = [];
        self.gridOptions.api.forEachNode( (node) => {
            statements.push(node.data);
        });

        self.accountService.addStatements(this.account._id, statements).then(() => {
            self.router.navigate(['account', self.account._id, 'transactions']);
        });
    }

    onCancel () {
        this.location.back();
    }
}