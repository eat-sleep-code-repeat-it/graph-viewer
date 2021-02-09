import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CytoNode } from '../../models/cyto-node';
import { CytoNodeShape } from '../../models/cyto-node-shape';
import { MouseAction } from '../../models/mouse-action';

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
 

  mouseAction$: Subject<MouseAction> = new Subject();
  saveGraph$: Subject<any> = new Subject();
  exportImage$: Subject<any> = new Subject();
  addNode$: Subject<any> = new Subject();
  center$: Subject<any> = new Subject();

  newNodeCount = 0;
  constructor() { }

  ngOnInit(): void {
  }
  nodeChange(event) {
    this.node_name = event;
  }
  addNewNode() {
    const newNode: CytoNode = { 
      id: this.newNodeCount++ + '_' + Date.now().toString(),
      name: this.newNodeCount++ + '_' + Date.now().toString(),
      weight: 100,
      colorCode: 'blue',
      shapeType: CytoNodeShape.RoundRectangle
    };
    this.addNode$.next(newNode);

    this.mouseAction$.next(MouseAction.AddNewNode);

  }
  saveGraph(){
    this.saveGraph$.next(true);
  }
  exportImage() {
    this.exportImage$.next(true)
  }
  resetMouse() {
    this.mouseAction$.next(MouseAction.None);
  }
  center() {
    this.center$.next(true);
  }

}
