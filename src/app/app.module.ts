import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './panel/panel.component';
import { HttpCacheInterceptor } from './interceptors/http-cache.interceptor';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, PanelComponent, AlphabetComponent],
  imports: [FormsModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
