import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CytographComponent } from './components/cytograph/cytograph.component';
import { HelpMapComponent } from './components/help-map/help-map.component';

const routes: Routes = [
  { path: '', component: CytographComponent},
  { path: 'help-map', component: HelpMapComponent},
  { path: 'graph-dagre', component: CytographComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CytoScapeRoutingModule { }
