import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular/main';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';

import { AccountRoutingModule } from './account-routing.module';

import { AccountComponent } from '../../component/account/account.component';
import { AccountOverviewComponent } from '../../component/account-overview/account-overview.component';
import { AccountChartsComponent } from '../../component/account-charts/account-charts.component';
import { AccountTransactionsComponent } from '../../component/account-transactions/account-transactions.component';
import { AccountImportComponent } from '../../component/account-import/account-import.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        AccountRoutingModule,
        AgGridModule.withComponents([]),
    ],
    declarations: [
        AccountComponent,
        AccountOverviewComponent,
        AccountChartsComponent,
        AccountTransactionsComponent,
        AccountImportComponent,
    ]
})
export class AccountModule {}
