import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { D3jsModule } from 'projects/d3js/src/lib/d3js.module';
import { CytographComponent } from './components/cytograph/cytograph.component';
import { NgCytoComponent } from './components/ng-cyto/ng-cyto.component';
import { CytoScapeModule } from 'projects/cyto-scape/src/lib/cyto-scape.module';

@NgModule({
  declarations: [
    AppComponent,
    CytographComponent,
    NgCytoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    D3jsModule,
    CytoScapeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
