import { NgModule } from '@angular/core';
import { CytoScapeComponent } from './cyto-scape/cyto-scape.component';
import { CytographComponent } from './components/cytograph/cytograph.component';
import { CytoScapeRenderComponent } from './components/cyto-scape-render/cyto-scape-render.component';
import { CytoScapeRoutingModule } from './cyto-scape-routing.module';
import { HelpMapComponent } from './components/help-map/help-map.component';
import { CytoRenderDirective } from './directives/cyto-render.directive';
 



@NgModule({
  declarations: [
    CytoScapeComponent,
    CytoScapeRenderComponent,
    CytographComponent,
    HelpMapComponent,
    CytoRenderDirective
  ],
  imports: [
    CytoScapeRoutingModule
  ],
  exports: [CytoScapeComponent]
})
export class CytoScapeModule { }
