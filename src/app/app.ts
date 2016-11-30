
import './polyfills.ts';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common'; 

import 'font-awesome-sass-loader';

import { AppComponent } from './component/app.component';
import { AccountComponent } from './component/account.component';
import { HomeComponent } from './component/home.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AccountComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: 'app', component: HomeComponent },
            { path: 'account', component: AccountComponent }
        ])
    ],
    providers: [{ provide: APP_BASE_HREF, useValue:'/src/app'}],
    bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
