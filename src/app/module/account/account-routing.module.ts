import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from '../../component/account/account.component';
import { AccountOverviewComponent } from '../../component/account-overview/account-overview.component';
import { AccountChartsComponent } from '../../component/account-charts/account-charts.component';
import { AccountTransactionsComponent } from '../../component/account-transactions/account-transactions.component';
import { AccountFormComponent } from '../../component/account-form/account-form.component';

const routes:Routes = [
    { path: 'account/:id', component: AccountComponent,
        children: [
            { path: '', redirectTo: 'overview' },
            { path: 'overview', component: AccountOverviewComponent },
            { path: 'charts', component: AccountChartsComponent },
            { path: 'transactions', component: AccountTransactionsComponent },
            { path: 'account-form/:id?', component: AccountFormComponent },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRoutingModule {}
