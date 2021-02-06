import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'lib-basic-svg-bg',
  templateUrl: './basic-svg-bg.component.html',
  styleUrls: ['./basic-svg-bg.component.css']
})
export class BasicSvgBgComponent implements OnInit {
  @ViewChild('d3jchartcontainer', { static: true }) private chartContainer: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.initSvg();
  }

  initSvg() {
    // append the svg object to the body of the page
    // moves the 'group' element to the top left margin
    let element: any = this.chartContainer.nativeElement;

    // 1.Create our SVG container with grey background    
    const svg = d3.select(element)
      .append("svg")
      .attr("width", 200)
      .attr("height", 100)
      .style('background-color', 'lightgrey');           
      
    var svgwidth = d3.select("svg").style('width');
    console.log('svgwidth', svgwidth);

    const node = d3.select('svg').node();
    console.log('node', node);
  }
}
