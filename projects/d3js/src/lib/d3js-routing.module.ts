import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicBarChartComponent } from './components/basic-bar-chart/basic-bar-chart.component';
import { BasicDataBindingComponent } from './components/basic-data-binding/basic-data-binding.component';
import { BasicDataFileComponent } from './components/basic-data-file/basic-data-file.component';
import { BasicShapeComponent } from './components/basic-shape/basic-shape.component';
import { BasicSvgBgComponent } from './components/basic-svg-bg/basic-svg-bg.component';
import { GraphOneComponent } from './components/graph-one/graph-one.component';

const routes: Routes = [
  { path: '', component: BasicShapeComponent },
  { path: 'graph-one', component: GraphOneComponent },
  { path: 'basic-shape', component: BasicShapeComponent },
  { path: 'basic-data', component: BasicDataFileComponent },
  { path: 'basic-svg-bg', component: BasicSvgBgComponent },
  { path: 'basic-data-binding', component: BasicDataBindingComponent },
  { path: 'basic-bar-chart', component: BasicBarChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class D3jsRoutingModule { }
