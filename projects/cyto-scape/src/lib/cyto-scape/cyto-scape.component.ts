import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-cyto-scape',
  templateUrl: './cyto-scape.component.html',
  styleUrls: ['./cyto-scape.component.css']
})
export class CytoScapeComponent implements OnInit {
  bgColor = 'Cyan';

  componentShow = 'graph-dagre';
  constructor() { }
  ngOnInit(): void {
  }
  changeComponent(comp: string) {
    this.componentShow = comp;
  }
}
