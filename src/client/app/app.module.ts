import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrebootModule } from 'preboot';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'rialto-app' }),
    PrebootModule.withConfig({
      appRoot: 'rlt-root',
      buffer: false
    }),
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    TransferHttpCacheModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
