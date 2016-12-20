
import './polyfills.ts';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';

import 'font-awesome-sass-loader';

import { AccountService } from './service/account.service';
import { DBService } from './service/db.service';
import { ElectronService } from './service/electron.service';

import { AppRoutingModule } from './route/app-routing.module';

import { AccountModule } from './module/account/account.module';

import { AppComponent } from './component/app/app.component';
import { HomeComponent } from './component/home/home.component';
import { AccountFormComponent } from './component/account-form/account-form.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AccountFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        AccountModule,
    ],
    providers: [
        DBService,
        AccountService,
        ElectronService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
