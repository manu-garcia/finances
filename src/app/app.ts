
import './polyfills.ts';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import 'font-awesome-sass-loader';

import { DBService } from './service/db.service';

import { AppComponent } from './component/app/app.component';
import { AccountComponent } from './component/account/account.component';
import { HomeComponent } from './component/home/home.component';
import { CreateAccount } from './component/create-account/create-account.component';

const routes: Routes = [
    { path: 'app', component: HomeComponent },
    { path: 'account', component: AccountComponent },
    { path: 'create-account', component: CreateAccount },
    { path: '', component: HomeComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AccountComponent,
        CreateAccount
    ],
    imports: [
        BrowserModule,
        // useHash is a friendlier location strategy when using Electron and webpack-dev-server code recompiling and reloading. No more 404 on a deep active route
        RouterModule.forRoot(routes, { useHash: true })
    ],
    providers: [
        DBService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
