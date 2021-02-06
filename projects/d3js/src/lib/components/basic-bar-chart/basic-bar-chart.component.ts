import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'lib-basic-bar-chart',
  templateUrl: './basic-bar-chart.component.html',
  styleUrls: ['./basic-bar-chart.component.css']
})
export class BasicBarChartComponent implements OnInit {
  @ViewChild('d3jchartcontainer', { static: true }) private chartContainer: ElementRef;

  svg: any;

  constructor() {
  }

  ngOnInit(): void {    
    this.render('responsive');
  }

  render(scaleType: string) {
    console.log('scaleType', scaleType);
    if (scaleType ==='xscale'){
      this.xScaleBarChart();
    } else if (scaleType ==='yscale') {
      this.yScaleBarChart();
    } else {
      this.responsiveBarChart();
    }
  }

  responsiveBarChart() {
    if (this.svg) this.svg.remove();

    let element: any = this.chartContainer.nativeElement;
    var dataset = [31, 64, 42, 28, 16, 32, 64, 10];

    // Create our SVG container
    this.svg = d3.select(element)
          .append("svg")
            .attr('viewBox','0 0 200 100' )
            .attr('preserveAspectRatio','xMinYMin');

    var bars = this.svg.append('g')
        .attr('class', 'bars');

    // Bind data to chart, and create bars
    bars.selectAll('rect')
      .data(dataset)
        .enter()
        .append('rect')
          .attr('x', (d,i) => i*25 )
          .attr('y', (d) => 100-d)
          .attr('width', 20)
          .attr('height', (d) => d);
  }

  xScaleBarChart() {
    if (this.svg) this.svg.remove();

    let element: any = this.chartContainer.nativeElement;
    // Set of data
    var dataset = [31, 64, 42, 28, 16, 32, 64, 90];

    var width = d3.select(element).node().getBoundingClientRect().width;
    var height = width/2;


    // Create our SVG container with grey background
    this.svg = d3.select(element)
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    // Create a group for the bars
    var bars = this.svg.append('g')
          .attr('class', 'bars');


    var xScale = d3.scaleLinear()
                .domain([0, dataset.length])
                .range([0, width]);


    // Bind data to chart, and create bars
    bars.selectAll('rect')
      .data(dataset)
        .enter()    
        .append('rect')
        .attr('x', (d,i) => xScale(i) )
        .attr('y', (d) => height-d)
        .attr('width', xScale(0.9))
        .attr('height', (d) => d);
  }

  yScaleBarChart() {
    if (this.svg) this.svg.remove();

    let element: any = this.chartContainer.nativeElement;
    // Set of data
    var dataset = [31, 64, 42, 28, 16, 32, 64, 90];

    var width = d3.select(element).node().getBoundingClientRect().width;
    var height = width/2;


    // Create our SVG container with grey background
    this.svg = d3.select(element)
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    // Create a group for the bars
    var bars = this.svg.append('g')
          .attr('class', 'bars');

    var xScale = d3.scaleLinear()
                .domain([0, dataset.length])
                .range([0, width]);
                
    var yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset)])
                .range([0, height]);


    // Bind data to chart, and create bars
    bars.selectAll('rect')
      .data(dataset)
        .enter()    
        .append('rect')
        .attr('x', (d,i) => xScale(i) )
        .attr('y', (d) => height-yScale(d))
        .attr('width', xScale(0.9))
        .attr('height', (d) => yScale(d));
        
  }
}
