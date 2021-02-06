import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-cytograph',
  templateUrl: './cytograph.component.html',
  styleUrls: ['./cytograph.component.css']
})
export class CytographComponent implements OnInit {
  node_name: string;

  layout = { name: 'dagre', rankDir: 'LR', directed: true, padding: 0};

  graphData = {
    nodes: [
        { data: { id: 'a', name: 'Signup', weight: 100, colorCode: 'blue', shapeType: 'roundrectangle' } },
        { data: { id: 'b', name: 'User Profile', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle' } },
        { data: { id: 'c', name: 'Billing', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle' } },
        { data: { id: 'd', name: 'Sales', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle' } },
        { data: { id: 'e', name: 'Referral', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle' } },
        { data: { id: 'f', name: 'Loan', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle' } },
        { data: { id: 'j', name: 'Support', weight: 100, colorCode: 'red', shapeType: 'ellipse' } },
        { data: { id: 'k', name: 'Sink Event', weight: 100, colorCode: 'green', shapeType: 'ellipse' } }
    ],
    edges: [
        { data: { source: 'a', target: 'b', colorCode: 'blue', strength: 10 } },
        { data: { source: 'b', target: 'c', colorCode: 'blue', strength: 10 } },
        { data: { source: 'c', target: 'd', colorCode: 'blue', strength: 10 } },
        { data: { source: 'c', target: 'e', colorCode: 'blue', strength: 10 } },
        { data: { source: 'c', target: 'f', colorCode: 'blue', strength: 10 } },
        { data: { source: 'e', target: 'j', colorCode: 'red', strength: 10 } },
        { data: { source: 'e', target: 'k', colorCode: 'green', strength: 10 } }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }
  nodeChange(event) {
    this.node_name = event;
  }

}
