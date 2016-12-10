import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from '../../component/account/account.component';
import { AccountOverviewComponent } from '../../component/account-overview/account-overview.component';
import { AccountChartsComponent } from '../../component/account-charts/account-charts.component';
import { AccountTransactionsComponent } from '../../component/account-transactions/account-transactions.component';

const routes:Routes = [
    { path: 'account/:id', component: AccountComponent,
        children: [
            { path: '', component: AccountOverviewComponent },
            { path: 'charts', component: AccountChartsComponent },
            { path: 'transactions', component: AccountTransactionsComponent },
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
