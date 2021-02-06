import { NgModule } from '@angular/core';
import { CytographComponent } from './components/cytograph/cytograph.component';
import { NgCytoComponent } from './components/ng-cyto/ng-cyto.component';
import { CytoScapeRoutingModule } from './cyto-scape-routing.module';
import { CytoScapeComponent } from './cyto-scape.component';



@NgModule({
  declarations: [
    CytoScapeComponent,
    NgCytoComponent,
    CytographComponent
  ],
  imports: [
    CytoScapeRoutingModule
  ],
  exports: [CytoScapeComponent]
})
export class CytoScapeModule { }
