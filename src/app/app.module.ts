import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { D3jsModule } from 'projects/d3js/src/lib/d3js.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    D3jsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
