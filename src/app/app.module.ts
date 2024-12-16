import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './panel/panel.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { FormsModule } from '@angular/forms';
import { ObsidianComponent } from './obsidian/obsidian.component';
import { HistoryService } from './services/history.service';

@NgModule({
  declarations: [AppComponent, PanelComponent, AlphabetComponent, ObsidianComponent],
  imports: [FormsModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [HistoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
