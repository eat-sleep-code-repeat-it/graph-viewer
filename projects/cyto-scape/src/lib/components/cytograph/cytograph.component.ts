import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BreadthfirstLayoutOtions } from '../../layouts/breadth-first';
import { ConcentricLayoutOptions } from '../../layouts/centric-layout';
import { CircleLayoutOptions } from '../../layouts/circle-layout';
import { ColaLayoutOptions } from '../../layouts/cola-layout';
import { CoseLayoutOptions } from '../../layouts/cose-layout';
import { DagreExtLayout } from '../../layouts/dagre-ext-layout';
import { GridLayoutOptions } from '../../layouts/grid-layout';
import { PresetLayoutOptions } from '../../layouts/preset-layout';
import { RandomLayoutOptions } from '../../layouts/random-layout';
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

  // layout = { name: 'dagre', rankDir: 'LR', directed: true, padding: 0};
  // layout = BreadthfirstLayoutOtions;
  // layout = CircleLayoutOptions;
  // layout = ConcentricLayoutOptions;
  // layout = CoseLayoutOptions;
  layout = GridLayoutOptions;
 

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
  fitAllElement$: Subject<any> = new Subject();
  selectionType$: Subject<any> = new Subject();
  openGraphFromJson$: Subject<any> = new Subject();
  removeSelectedNode$: Subject<any> = new Subject();
  linkSelectedNodes$: Subject<any> = new Subject();

  newNodeCount = 0;
  constructor() { }

  ngOnInit(): void {
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
  fitAllElement() {
    this.fitAllElement$.next(true);
  }
  setSelectionType(type: 'single'|'additive') {
    this.selectionType$.next(type);
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      console.error("please select one file.");
      return false;
    }

    const file = target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (e: any) => {
      const content = e.target.result;
      if (content) {
        const json = JSON.parse(content);
        // console.log('file content:', content);
        this.openGraphFromJson$.next(json);
      }
    }
  }

  nodeSelectedChange(selected: any)
  {
    console.log('nodeSelected', selected);  
    this.node_name = '';
    if (selected.length > 0){
      const node = selected[selected.length-1];
      console.log('nodeSelected-node', node);
      this.node_name = !!node.data('description') ? node.data('description'): node.data('name');
    }    
  }
  removeSelectedNode() {
    this.removeSelectedNode$.next(true);
  }
  edgeSelectedChange(selected: any) {
    console.log('edgeSelected', selected);   
  }
  linkSelectedNodes() {
    this.linkSelectedNodes$.next(true);
  }
  layoutChanged(evt: any) {

    console.log(evt.target.value);
    if (evt.target && evt.target.value === 'circle') {
      this.layout = CircleLayoutOptions;
    } else if (evt.target && evt.target.value === 'breadth-first') {
      this.layout = BreadthfirstLayoutOtions;
    } else if (evt.target && evt.target.value === 'concentric') {
      this.layout = ConcentricLayoutOptions;
    } else if (evt.target && evt.target.value === 'cose') {
      this.layout = CoseLayoutOptions;
    } else if (evt.target && evt.target.value === 'grid') {
      this.layout = GridLayoutOptions;
    } else if (evt.target && evt.target.value === 'dagre') {
      this.layout = DagreExtLayout;
    } else if (evt.target && evt.target.value === 'preset') {
      this.layout = PresetLayoutOptions;
    } else if (evt.target && evt.target.value === 'random') {
      this.layout = RandomLayoutOptions;
    } else if (evt.target && evt.target.value === 'cola') {
      this.layout = ColaLayoutOptions;
    } else {
      this.layout = CoseLayoutOptions;
    } 
  }
}
