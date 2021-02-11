import { identifierModuleUrl, NodeWithI18n } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, OnChanges, Renderer2 } from '@angular/core';
import  * as cytoscape from 'cytoscape';
import * as dagre from 'cytoscape-dagre';
import * as edgehandles from 'cytoscape-edgehandles';

import { Observable, Subscription } from 'rxjs';
import { CytoNode } from '../../models/cyto-node';
import { CytoNodeShape } from '../../models/cyto-node-shape';
import { MouseAction } from '../../models/mouse-action';

@Component({
  selector: 'lib-cyto-scape-render',
  templateUrl: './cyto-scape-render.component.html',
  styleUrls: ['./cyto-scape-render.component.css']
})
export class CytoScapeRenderComponent implements OnInit, OnChanges {
	@Input() public elements: any;
	@Input() public style: any;
	@Input() public layout: any;
	@Input() public zoom: any;

	@Input() public panZoomIn$: Observable<any>;
	@Input() public panInChild$: Observable<any>;
	@Input() public showHoverInfo$: Observable<any>;

	@Input() public fitAllElement$: Observable<any>; // Fit to all elements in the graph
	@Input() public center$: Observable<any>;
	@Input() public addNode$: Observable<any>;
	@Input() public addEdge$: Observable<any>;
	@Input() public linkSelectedNodes$: Observable<boolean>;
	@Input() public edgehandleMode$: Observable<boolean>;
	
	
	@Input() public removeSelectedNode$: Observable<any>;
	@Input() public saveGraph$: Observable<any>;
	@Input() public openGraphFromJson$: Observable<any>;
	@Input() public exportImage$: Observable<any>;
	@Input() public mouseAction$: Observable<MouseAction>;
	@Input() public selectionType$: Observable<string>;

	@Output() nodeSelected: EventEmitter<any> = new EventEmitter<any>();
	@Output() edgeSelected: EventEmitter<any> = new EventEmitter<any>();

	private cytoInstance: any;
	private subscriptions: Subscription[] = [];

	private mouseAction = MouseAction.None;
	private edgeHandler: any;
	public constructor(private renderer : Renderer2, private el: ElementRef) {
		this.layout = this.layout || {
				name: 'grid',
				directed: true,
				padding: 0
			};

		this.zoom = this.zoom || {
				min: 0.1,
				max: 1.5
			};

		this.style = this.style || cytoscape.stylesheet()
			.selector('node')
				.css({
					'shape': 'data(shapeType)',
					'width': 'mapData(weight, 40, 80, 20, 100)',
					'content': 'data(name)',
					'text-valign': 'center',
					'text-outline-width': 1,
					'text-outline-color': 'data(colorCode)',
					'background-color': 'data(colorCode)',
					'color': '#fff',
					'font-size': 10
				})
			.selector(':selected')
				.css({
					'border-width': 1,
					'border-color': 'black'
				})
			.selector('edge')
				.css({
					'curve-style': 'bezier',
					'opacity': 0.666,
					'width': 'mapData(strength, 70, 100, 2, 6)',
					'target-arrow-shape': 'triangle',
					'line-color': 'data(colorCode)',
					'source-arrow-color': 'data(colorCode)',
					'target-arrow-color': 'data(colorCode)'
				})
			.selector('edge.questionable')
				.css({
					'line-style': 'dotted',
					'target-arrow-shape': 'diamond'
				})
			.selector('.faded')
				.css({
					'opacity': 0.25,
					'text-opacity': 0
				});

		// some style for the edgehandle extension
		this.style.selector('.eh-handle')
				.css({
					'background-color': 'red',
					'width': 12,
					'height': 12,
					'shape': 'ellipse',
					'overlay-opacity': 0,
					'border-width': 12, // makes the handle easier to hit
					'border-opacity': 0
				})
			.selector('.eh-hover')
				.css({
					'background-color': 'red'
				}) 
			.selector('.eh-source')
				.css({
					'border-width': 2,
					'border-color': 'red'
				}) 
			.selector('.eh-target')
				.css({
					'border-width': 2, 'border-color': 'red'
				}) 
			.selector('.eh-preview, .eh-ghost-edge')
				.css({
					'background-color': 'red',
					'line-color': 'red',
					'width': '2',
					'target-arrow-color': 'red',
					'source-arrow-color': 'red'
				})
			.selector('.eh-ghost-edge.eh-preview-active')
				.css({
					'opacity': 0
				});
	}
	
	public ngOnChanges(): any {
		this.render();
		console.log(this.el.nativeElement);
	}

	public render() {
		if (typeof cytoscape('core', 'dagre') !== 'function') {
			cytoscape.use(dagre); // register extension
		}
		
		if (typeof cytoscape('core', 'edgehandles') !== 'function') {
			cytoscape.use(edgehandles); // register extension
		}

		const cy_contianer = this.renderer.selectRootElement("#cy");
		// container: document.getElementById('cy'),

		let cy = cytoscape({
				container : cy_contianer,
				layout: this.layout,
				minZoom: this.zoom.min,
				maxZoom: this.zoom.max,
				style: this.style,
				elements: this.elements,
		});

		// reset node width
		cy.nodes().forEach((n) => { n.data('width', 400); });
		
		cy.on('tap', (e) => {
			if (e.target === cy) {
				cy.elements().removeClass('faded');
			}

			/*
			console.log('this.mouseAction', this.mouseAction);
			if (this.mouseAction === MouseAction.AddNewNode) {
				console.log('tag', e.position);
				const newNode = new CytoNode();
				newNode.id = Date.now().toString();
				newNode.name = Date.now().toString();
				newNode.weight = 100;
				newNode.colorCode = 'blue';
				newNode.shapeType = CytoNodeShape.RoundRectangle;
				cy.add({
					group: 'nodes',
					data: newNode,
					position: e.position
				});
			}
			*/
			
		});
		cy.on('click', (evt) => {
			if (evt.target === cy) {
				//cy.elements().removeClass('faded');								
			}
		});
	
		// handle edge event
		cy.on('select', 'edge', (evt) => {
			evt.target.animate({
				style: { 'line-color': 'red'}
			}, {duration: 100 });

			console.log('selected edge:', evt.target);
			this.edgeSelectedChangeEmitter();			
		});
		cy.on('unselect', 'edge', (evt) => {
			evt.target.stop();
			evt.target.style({
				'line-color': evt.target.data('colorCode')
			});
			console.log('unselect edge', evt.target);
			this.edgeSelectedChangeEmitter();		
		});
		cy.on('mouseover', 'edge', (evt) => {
			console.log('mouseover edge', evt.target);
		});
		cy.on('mouseout', 'edge', (evt) => {
			console.log('mouseout edge', evt.target);
		});
		
		// handle node event
		cy.on('tap', 'node', (e) => {
			/*
			if (e.target) {
				console.log('click node', e.target);
				this.nodeClickHandler(e.target)
			}
			*/
		});
		cy.on('click', 'node', (evt) => {
			if (evt.target) {
				console.log('click node', evt.target);
				this.nodeClickHandler(evt.tartget)
			}
		});
		cy.on('select', 'node', (evt) => {
			console.log('select node', evt.target);
			evt.target.animate({
				style: {'border-color': 'red', 'border-width': 2}
			}, {duration: 100 });
			
			this.nodeSelectedChangeEmitter();			
		});
		cy.on('unselect', 'node', (evt) => {
			console.log('unselect node', evt.target);
			evt.target.stop();
			evt.target.style({
				'background-color': evt.target.data('colorCode'),
				'border-color': 'black'
			});
			this.nodeSelectedChangeEmitter();	
		})
		cy.on('mouseover', 'node', (evt) => {
			console.log('mouseover node', evt.target);
		});
		cy.on('mouseout', 'node', (evt) => {
			console.log('mouseout node', evt.target);
		});
		cy.on('mousedown', 'node', (evt) => {
			console.log('mousedown node', evt.target);
		});
		cy.on('mouseup', 'node', (evt) => {
			console.log('mouseup node', evt.target);
		});
		cy.on('drag', 'node', (evt) => {
			console.log('drag node', evt.target);
		});	
		
		this.edgeHandler = cy.edgehandles(this.edgeHandleDefault());
		// this.edgeHandler = cy.edgehandles();

		this.cytoInstance = cy;
	}

	public ngOnInit() {
		if (this.mouseAction$){
			this.subscriptions.push(
				this.mouseAction$.subscribe((action: MouseAction)=>{
					console.log('action', action);
					this.mouseAction = action;
				})
			);
		}

		if (this.panZoomIn$){
			this.subscriptions.push(
				this.panZoomIn$.subscribe((nodeId)=>{
					this.panZoomInHandler(nodeId);
				})
			);
		}

		if (this.panInChild$){
			this.subscriptions.push(
				this.panInChild$.subscribe(()=>{
					if (this.cytoInstance){
						this.panInChildHandler();
					}					
				})
			);
		}

		if (this.center$){
			this.subscriptions.push(
				this.center$.subscribe(()=>{
					this.centerHandler();
				})
			);
		}
		if (this.fitAllElement$){
			this.subscriptions.push(
				this.fitAllElement$.subscribe(()=>{
					this.cytoInstance.fit();
				})
			);
		}
		if (this.addNode$){
			this.subscriptions.push(
				this.addNode$.subscribe((newNode: CytoNode)=>{
					const position = {
						x: 100,
						y: 100
					}
					this.addNodeHandler(position, newNode);
				})
			);
		}

		if (this.addEdge$){
			this.subscriptions.push(
				this.addEdge$.subscribe((id: string)=>{
					const selectedNodes = this.cytoInstance.nodes(':selected');
					if (selectedNodes.length == 2){
						this.cytoInstance.add({
							group: 'edges',
							data: {
								source: selectedNodes[0].data('id'),
								target: selectedNodes[1].data('id'),
								strength: 10
							}
						});
					}
				})
			);
		}
		if (this.linkSelectedNodes$){
			this.subscriptions.push(
				this.linkSelectedNodes$.subscribe(()=> {
					this.linkSelectedNodesHandler();
				})
			)
		}
		
		if (this.removeSelectedNode$){
			this.subscriptions.push(
				this.removeSelectedNode$.subscribe(()=>{
					const selected = this.cytoInstance.nodes(':selected');
					if (selected) {
						this.removeSelectedNodeHandler(selected);
					}
				})
			);
		}  

		if (this.saveGraph$){
			this.subscriptions.push(
				this.saveGraph$.subscribe(()=>{
					const graphJSON = this.cytoInstance.json();
					const graphJsonStr = JSON.stringify(graphJSON);
					const blob = new Blob([graphJsonStr], {
						type:'text/plain:charset=utf-8;'
					});
					const fileName = '' + new Date().getTime() + '.json';
					this.saveAsFileHandler(blob, fileName);
				})
			);
		}
		if (this.openGraphFromJson$){
			this.subscriptions.push(
				this.openGraphFromJson$.subscribe((graphJson)=>{
					if (graphJson && 	this.cytoInstance) {
						console.log('graphJson:', graphJson);
						this.cytoInstance.json(graphJson);
						this.cytoInstance.fit();
					}					
				})
			);
		}

		if (this.exportImage$){
			this.subscriptions.push(
				this.exportImage$.subscribe(()=>{
					this.exportImageHandler();
				})
			);
		}

		if (this.selectionType$) {
			this.subscriptions.push(
				this.selectionType$.subscribe((selectionType: string) =>{
					if (selectionType === 'additive') {
						this.cytoInstance.selectionType('additive');
					} else {
						this.cytoInstance.selectionType('single');
					}
					//??	this.cytoInstance.boxSelectionEnabled(true);
				})
			)
		}
		if (this.edgehandleMode$) {
			this.subscriptions.push(
				this.edgehandleMode$.subscribe((modeOn: boolean) =>{
					if (modeOn) {
						this.edgeHandler.enableDrawMode();
					} else {
						this.edgeHandler.disableDrawMode();
					}
				})
			)
		}
		
		
	}

	private edgeHandleDefault() {
		// the default values of each option are outlined below:
		let defaults = {
			preview: true, // whether to show added edges preview before releasing selection
			hoverDelay: 150, // time spent hovering over a target node before it is considered selected
			handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
			snap: false, // when enabled, the edge can be drawn by just moving close to a target node
			snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
			snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
			noEdgeEventsInDraw: false, // set events:no to edges during draws, prevents mouseouts on compounds
			disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
			handlePosition: function( node ){
				return 'middle top'; // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
			},
			handleInDrawMode: false, // whether to show the handle in draw mode
			edgeType: function( sourceNode, targetNode ){
				// can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
				// returning null/undefined means an edge can't be added between the two nodes
				return 'flat';
			},
			loopAllowed: function( node ){
				// for the specified node, return whether edges from itself to itself are allowed
				return false;
			},
			nodeLoopOffset: -50, // offset for edgeType: 'node' loops
			nodeParams: function( sourceNode, targetNode ){
				// for edges between the specified source and target
				// return element object to be passed to cy.add() for intermediary node
				return {};
			},
			edgeParams: function( sourceNode, targetNode, i ){
				// for edges between the specified source and target
				// return element object to be passed to cy.add() for edge
				// NB: i indicates edge index in case of edgeType: 'node'
				return {};
			},
			ghostEdgeParams: function(){
				// return element object to be passed to cy.add() for the ghost edge
				// (default classes are always added for you)
				return {};
			},
			show: function( sourceNode ){
				// fired when handle is shown
			},
			hide: function( sourceNode ){
				// fired when the handle is hidden
			},
			start: function( sourceNode ){
				// fired when edgehandles interaction starts (drag on handle)
			},
			complete: function( sourceNode, targetNode, addedEles ){
				// fired when edgehandles is done and elements are added
			},
			stop: function( sourceNode ){
				// fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
			},
			cancel: function( sourceNode, cancelledTargets ){
				// fired when edgehandles are cancelled (incomplete gesture)
			},
			hoverover: function( sourceNode, targetNode ){
				// fired when a target is hovered
			},
			hoverout: function( sourceNode, targetNode ){
				// fired when a target isn't hovered anymore
			},
			previewon: function( sourceNode, targetNode, previewEles ){
				// fired when preview is shown
			},
			previewoff: function( sourceNode, targetNode, previewEles ){
				// fired when preview is hidden
			},
			drawon: function(){
				// fired when draw mode enabled
			},
			drawoff: function(){
				// fired when draw mode disabled
			}
		};
		return defaults;
	}
	private nodeClickHandler(node: any) {
		console.log('node clicked:', node);

		const neighborhood = node.neighborhood().add(node);
		this.cytoInstance.elements().addClass('faded');
		neighborhood.removeClass('faded');
	}
	private panZoomInHandler(nodeId: string) {
		console.log('panZoomIn->', nodeId);
	}
	private panInChildHandler() {
		console.log('panInChild');
	}
	private centerHandler() {
		this.cytoInstance.center();
		console.log('center');
	}
	private addNodeHandler(position: any, newNode: CytoNode) {
		console.log('tag', position, newNode);
		this.cytoInstance.add({
			group: 'nodes',
			data: newNode,
			// position: position
		});
		console.log('addNode', newNode);
	} 
 
	private removeSelectedNodeHandler(selectedNodes: any[]) {
		if (selectedNodes && selectedNodes.length>0){
			selectedNodes.forEach(element => {
				this.cytoInstance.remove(element);
			});
		}		
	}

	private exportImageHandler() {
		if (this.cytoInstance) {
			const imageName = 'test.png';
			const options: any = {output:'blob', full: true};
			const text = this.cytoInstance.png(options);
			const blobType = 'image/png';
			const blob = new Blob([text], { type: blobType});
			this.saveAsFileHandler(blob, imageName);
		}
	}

	private saveAsFileHandler(blob: Blob, fileName: string){
		console.log('saveAsFile', blob, fileName); 
		const exportUrl = URL.createObjectURL(blob);
		if (window.navigator.msSaveBlob){
			window.navigator.msSaveBlob(blob,`'${fileName}`);
		} else {
			const downloadLink = document.createElement('a');
			document.body.appendChild(downloadLink);
			downloadLink.href = exportUrl;
			downloadLink.download = `${fileName}`;
			downloadLink.click();
		}
	}

	nodeSelectedChangeEmitter() {
		if (this.cytoInstance) {
			const nodeSelected = this.cytoInstance.elements('node:selected'); 
			this.nodeSelected.emit(nodeSelected);
			console.log('nodeSelectedChange', nodeSelected);
		}		
	}
	edgeSelectedChangeEmitter() {
		if (this.cytoInstance) {
			const edgeSelected = this.cytoInstance.elements('edge:selected'); 
			this.edgeSelected.emit(edgeSelected);
			console.log('edgeSelectedChange', edgeSelected);
		}		
	}
	linkSelectedNodesHandler() {
		const selectedNodes = this.cytoInstance.nodes(':selected');
					if (selectedNodes && selectedNodes.length>1){
						let j = 0;
						for(let i=1; i<selectedNodes.length; i++){
							this.cytoInstance.add({
								group: 'edges',
								data: {
									source: selectedNodes[j].data('id'),
									target: selectedNodes[i].data('id'),
									strength: 10
								}
							});
							j = i;
						}
					}
	}

	private addEdgeHandler() {
		console.log('addEdge');
	}
	private showHoverInfoHandler() {
		console.log('showHoverInfo');
	}

}
