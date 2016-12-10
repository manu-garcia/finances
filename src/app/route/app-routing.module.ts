import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../component/home/home.component';
import { AccountFormComponent } from '../component/account-form/account-form.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'account-form', component: AccountFormComponent },
    // { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [
        // useHash is a friendlier location strategy when using Electron and webpack-dev-server code recompiling and reloading. No more 404 on a deep active route
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}