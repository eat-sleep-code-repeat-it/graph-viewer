import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3";

// https://lucidar.me/en/d3.js/part-08-bar-chart/


@Component({
  selector: 'lib-graph-one',
  templateUrl: './graph-one.component.html',
  styleUrls: ['./graph-one.component.css']
})
export class GraphOneComponent implements OnInit {
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
    // this.renderBarWithOutGroup();
    this.renderBarWithGroup();
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

  renderBarWithOutGroup() {
     // 2.bind our dataset in order to display the bars.
    // Bind data to chart, and create bars
    const dataset = [31, 64, 42, 28, 16, 32, 64, 10];
    let bar = this.svg.selectAll('.bar')
      .data(dataset)
      .enter()
      .append('rect'); 
    
    // want rectangle to be spread across the width of our container,
    const sizeOfBar = this.svgWidth/dataset.length;
    const barSpace = 20;
    const widthBar = sizeOfBar - barSpace;

    //  sets the x-coordinate for each rectangle    
    bar.attr('x', (d, i) => i*sizeOfBar );

    // shifting the y-coordinate of each rectangle so to reverse the chart:
    bar.attr('y', (d) => 100-d)
    // bar.attr('y', 0);

    bar.attr('width', widthBar)

    //the rectangle height to the value of our data
    bar.attr('height', (d) => d);    
  }
  renderBarWithGroup() {
    // 2.bind our dataset in order to display the bars.
    // Bind data to chart, and create bars
    const dataset = [31, 64, 41, 28, 17, 32, 64, 11];

    // create group entiry to put bar into the group
    this.groupEntiry = this.svg.append('g')
      .attr('class', 'bars');

    let bar = this.groupEntiry.selectAll('.bar')
      .data(dataset) 
      .enter()
      .append('rect');

    // set color for each bar based on odd/even value
    bar.style("fill", (d: any) => {
        return d%2 === 0 ? "blue" : "green";
      });
   
    // want rectangle to be spread across the width of our container,
    // each rectangle must be spaced with n pixels (svgwidth pixels / rows in dataset).
    const sizeOfBar = this.svgWidth/dataset.length;
    const barSpace = 20;
    const widthBar = sizeOfBar - barSpace;

    //  sets the x-coordinate for each rectangle    
    bar.attr('x', (d, i) => i*sizeOfBar );

    // shifting the y-coordinate of each rectangle so to reverse the chart:
    bar.attr('y', (d) => 100-d)
    // bar.attr('y', 0);

    bar.attr('width', widthBar)

    //the rectangle height to the value of our data
    bar.attr('height', (d) => d);     
  }
}
