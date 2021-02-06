import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3";

// https://lucidar.me/en/d3.js/part-08-bar-chart/

@Component({
  selector: 'lib-basic-shape',
  templateUrl: './basic-shape.component.html',
  styleUrls: ['./basic-shape.component.css']
})
export class BasicShapeComponent implements OnInit {
  @ViewChild('d3jchartcontainer', { static: true }) private chartContainer: ElementRef;

  margin: any;
  svgWidth: any;
  svgHeight: any;
  groupEntiry: any;

  i = 0;
  duration = 750;
  rootNode: any;
  treemap: any;
  svg: any;
  constructor() {
    // Set the dimensions and margins of the diagram
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 1024 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;
    this.svgWidth = width + margin.right + margin.left;
    this.svgHeight = height + margin.top + margin.bottom;
  }

  ngOnInit(): void {
    this.initSvg();
    this.basicShapes();
  }

  initSvg() {
    // append the svg object to the body of the page
    // moves the 'group' element to the top left margin
    let element: any = this.chartContainer.nativeElement;

    // 1.Create our SVG container with grey background    
    this.svg = d3.select(element)
      .append("svg")
      .attr("width", this.svgWidth)
      .attr("height", this.svgHeight)
      .style('background-color', 'lightgrey');           
      
    var svgwidth = d3.select("svg").style('width');
    console.log('svgwidth', svgwidth);

    const node = d3.select('svg').node();
    console.log('node', node);
  }
  basicShapes() {
    // method .style() add or update the CSS style of the selected element.
    // method .attr() add or update the attribute of the selected element.
    // method .text() adds text in the selected element.
    // d3.select(element).text('Hello world!')

    // Method chaining is a syntax for calling several methods in one instruction on the same instance.
    // It can be done if each method returns the current object (this).

    //Draw the Circle
    const circle = this.svg.append("circle")
    .attr("cx", 150)
    .attr("cy", 30)
    .attr("r", 20);

    const ellipse = this.svg.append("ellipse")
                .attr("cx", 150)
                .attr("cy", 100)
                .attr("rx", 20)
                .attr("ry", 60);
                
    var rectangle = this.svg.append("rect")
                .attr("x", 10)
                .attr("y", 40)
                .attr("width", 50)
                .attr("height", 100); 

    var line = this.svg.append("line")
                .attr("x1", 5)
                .attr("y1", 5)
                .attr("x2", 100)
                .attr("y2", 50)
                .attr("stroke-width", 2)
                .attr("stroke", "black");

    var text = this.svg.append('text')
    .attr('x', 100)
    .attr('y', 50)
    .text("I'm a text with D3.js");

  var polyline = this.svg.append('polyline')
    .attr('points', "50,50 100,50 100,100 150,100 200,150 250 150")
    .attr('fill', "none")
    .attr('stroke', 'blue');

  var polygon = this.svg.append('polygon')
    .attr('points', "50,50 200,50 250,100 250,150 20,50")
    .attr('stroke', '#f00')
    .attr('fill', 'none');

  var filledpolygon = this.svg.append('polygon')
    .attr('points', "50,50 200,50 250,100 250,150 20,50")
    .attr('fill', 'green');
  }
}

