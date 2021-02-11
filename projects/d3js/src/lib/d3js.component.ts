import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-d3js',
  templateUrl: './d3js.component.html',
})
export class D3jsComponent implements OnInit {
  componentShow = 'basic-shape';
  constructor() { }

  ngOnInit(): void {
  }
  changeComponent(comp: string) {
    this.componentShow = comp;
  }
}
