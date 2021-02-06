import { NgModule } from '@angular/core';


import { D3jsComponent } from './d3js.component';
import { GraphOneComponent } from './components/graph-one/graph-one.component';
import { D3jsRoutingModule } from './d3js-routing.module';
import { BasicShapeComponent } from './components/basic-shape/basic-shape.component';
import { BasicDataFileComponent } from './components/basic-data-file/basic-data-file.component';
import { BasicSvgBgComponent } from './components/basic-svg-bg/basic-svg-bg.component';
import { BasicDataBindingComponent } from './components/basic-data-binding/basic-data-binding.component';
import { BasicBarChartComponent } from './components/basic-bar-chart/basic-bar-chart.component';



@NgModule({
  declarations: [
    D3jsComponent,
    GraphOneComponent,
    BasicShapeComponent,
    BasicDataFileComponent,
    BasicSvgBgComponent,
    BasicDataBindingComponent,
    BasicBarChartComponent
  ],
  imports: [
    D3jsRoutingModule
  ],
  exports: [
    D3jsComponent,
    GraphOneComponent  
  ]
})
export class D3jsModule { }
