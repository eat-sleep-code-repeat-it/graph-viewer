import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-help-map',
  templateUrl: './help-map.component.html',
  styleUrls: ['./help-map.component.css']
})
export class HelpMapComponent implements OnInit {
  node_name: string;
  layout = { name: 'dagre', rankDir: 'LR', directed: true, padding: 0};
  graphData = {
    nodes: [        
      { data: {
          id: 'a', name: 'cyto-scape', weight: 300, colorCode: 'blue', shapeType:'roundrectangle',
          description:'main entry to cyto-scape library'
        }
      },
      { data: { 
          id: 'b', name: 'cytograph', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle',
          description:'simple directed graph'
        }
      },
      { 
        data: { id: 'c', name: 'help-map', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle',
          description:'component relationship'
        }
      },
      { 
        data: { id: 'd', name: 'cyto-scape-render', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle',
          description:'render graph with cytoscape'
        } 
      },
    ],
    edges: [
      { data: { source: 'a', target: 'b', colorCode: 'blue', strength: 10 } },
      { data: { source: 'a', target: 'c', colorCode: 'blue', strength: 10 } },
      { data: { source: 'b', target: 'd', colorCode: 'blue', strength: 10 } },
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }
  nodeChange(event) {
    this.node_name = event;
  }

}
