import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CytoScapeComponent } from 'projects/cyto-scape/src/lib/cyto-scape.component';
import { D3jsComponent } from 'projects/d3js/src/lib/d3js.component';

const routes: Routes = [
  { path: '', component: D3jsComponent },
  { path: 'graph-cyto', component: CytoScapeComponent },
  { path: 'graph-d3js', component: D3jsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
