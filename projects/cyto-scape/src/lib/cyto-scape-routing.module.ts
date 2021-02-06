import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CytographComponent } from 'src/app/components/cytograph/cytograph.component';

const routes: Routes = [
  { path: '', component: CytographComponent },
  { path: 'graph-dagre', component: CytographComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CytoScapeRoutingModule { }
