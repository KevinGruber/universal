import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrebootModule } from 'preboot';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { CoreModule } from './core/core.module';
import { APP_ROUTING } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'rialto-app' }),
    PrebootModule.withConfig({ appRoot: 'rlt-root' }),
    RouterModule.forRoot(APP_ROUTING),
    CoreModule,
    TransferHttpCacheModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
