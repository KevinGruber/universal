import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { PrebootModule } from 'preboot';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'rialto-app'}),
        PrebootModule.withConfig({
            appRoot: 'rlt-root',
            buffer: false
        }),
        AppRoutingModule,
        CoreModule,
        HttpClientModule,
        TransferHttpCacheModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
