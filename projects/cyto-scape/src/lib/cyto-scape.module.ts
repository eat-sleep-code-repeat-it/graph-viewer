import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { CytoScapeComponent } from './cyto-scape/cyto-scape.component';
import { CytographComponent } from './components/cytograph/cytograph.component';
import { CytoScapeRenderComponent } from './components/cyto-scape-render/cyto-scape-render.component';
import { CytoScapeRoutingModule } from './cyto-scape-routing.module';
import { HelpMapComponent } from './components/help-map/help-map.component';
import { CytoRenderDirective } from './directives/cyto-render.directive';
import { CompoundNodesComponent } from './components/compound-nodes/compound-nodes.component';
 



@NgModule({
  declarations: [
    CytoScapeComponent,
    CytoScapeRenderComponent,
    CytographComponent,
    CompoundNodesComponent,
    HelpMapComponent,
    CytoRenderDirective
  ],
  imports: [
    CommonModule,
    CytoScapeRoutingModule
  ],
  exports: [CytoScapeComponent]
})
export class CytoScapeModule { }
