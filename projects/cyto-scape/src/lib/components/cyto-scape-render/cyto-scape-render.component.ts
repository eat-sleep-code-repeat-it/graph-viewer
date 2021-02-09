import { identifierModuleUrl, NodeWithI18n } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, OnChanges, Renderer2 } from '@angular/core';
import  * as cytoscape from 'cytoscape';
import * as dagre from 'cytoscape-dagre';
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

	@Input() public center$: Observable<any>;
	@Input() public addNode$: Observable<any>;
	@Input() public addEdge$: Observable<any>;
	@Input() public removeSelectedNode$: Observable<any>;
	@Input() public saveGraph$: Observable<any>;
	@Input() public exportImage$: Observable<any>;

	@Input() public mouseAction$: Observable<MouseAction>;

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

	private cytoInstance: any;
	private subscriptions: Subscription[] = [];

	private mouseAction = MouseAction.None;
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
	}

	
	public ngOnChanges(): any {
		this.render();
		console.log(this.el.nativeElement);
	}

	public render() {
		cytoscape.use(dagre); // register extension
		let cy_contianer = this.renderer.selectRootElement("#cy");
		// container: document.getElementById('cy'),

		let localselect = this.select;
		let cy = cytoscape({
				container : cy_contianer,
				layout: this.layout,
				minZoom: this.zoom.min,
				maxZoom: this.zoom.max,
				style: this.style,
				elements: this.elements,
		});

		cy.nodes().forEach(function(n){ n.data('width',400); });

		cy.on('tap', 'node', (e) => {
			var node = e.target;
			var neighborhood = node.neighborhood().add(node);

			cy.elements().addClass('faded');
			neighborhood.removeClass('faded');
			localselect.emit( !!node.data('description') ? node.data('description'): node.data('name'));
		});

		cy.on('tap', (e) => {
			if (e.target === cy) {
				cy.elements().removeClass('faded');
			}

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
			
		});
	
		// handle edge event
		cy.on('select', 'edge', (evt) => {
			evt.target.animate({
				style: { 'line-color': 'red'}
			}, {duration: 100 });

			if (evt.target) {
				console.log('selected edge:', evt.target);
			}
		});
		cy.on('unselect', 'edge', (evt) => {
			evt.target.stop();
			evt.target.style({
				'line-color': evt.target.data('colorCode')
			});
			console.log('unselect edge', evt.target);
		});
		cy.on('mouseover', 'edge', (evt) => {
			console.log('mouseover edge', evt.target);
		});
		cy.on('mouseout', 'edge', (evt) => {
			console.log('mouseout edge', evt.target);
		});
		
		// handle node event
		cy.on('click', 'node', (evt) => {
			console.log('click node', evt.target);
			const node = evt.target;
			if (node) {
				const neighborhood = node.neighborhood().add(node);
				cy.elements().addClass('faded');
				neighborhood.removeClass('faded');
				localselect.emit(node.data('name'));
			}
		});
		cy.on('select', 'node', (evt) => {
			if (this.mouseAction !== MouseAction.SelectNode) {
				return;
			}

			console.log('select node', evt.target);
			evt.target.animate({
				style: {'border-color': 'red', 'border-width': 2}
			}, {duration: 100 });
		});
		cy.on('unselect', 'node', (evt) => {
			console.log('unselect node', evt.target);

			evt.target.stop();
			evt.target.style({
				'background-color': evt.target.data('colorCode'),
				'border-color': 'black'
			});
			
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

		cy.on('click', (evt) => {
			if (evt.target === cy) {
				cy.elements().removeClass('faded');								
			}
		});
		
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
					this.panZoomIn(nodeId);
				})
			);
		}

		if (this.panInChild$){
			this.subscriptions.push(
				this.panInChild$.subscribe(()=>{
					if (this.cytoInstance){
						this.panInChild();
					}					
				})
			);
		}

		if (this.center$){
			this.subscriptions.push(
				this.center$.subscribe(()=>{
					this.center();
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
					this.addNode(position, newNode);
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
		
		if (this.removeSelectedNode$){
			this.subscriptions.push(
				this.removeSelectedNode$.subscribe(()=>{
					const selected = this.cytoInstance.nodes(':selected');
					if (selected) {
						this.removeSelectedNode(selected);
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
					const fileName = '' + new Date().getTime() + '.cytograph';
					this.saveAsFile(blob, fileName);
				})
			);
		}

		if (this.exportImage$){
			this.subscriptions.push(
				this.exportImage$.subscribe(()=>{
					this.exportImage();
				})
			);
		}
		
	}
	private panZoomIn(nodeId: string) {
		console.log('panZoomIn->', nodeId);
	}
	private panInChild() {
		console.log('panInChild');
	}
	private center() {
		this.cytoInstance.center();
		console.log('center');
	}
	private addNode(position: any, newNode: CytoNode) {
		console.log('tag', position, newNode);
		this.cytoInstance.add({
			group: 'nodes',
			data: newNode,
			// position: position
		});
		console.log('addNode', newNode);
	} 
 
	private removeSelectedNode(selectedNode) {
		console.log('removeSelectedNode', selectedNode);
	}

	private exportImage() {
		if (this.cytoInstance) {
			const imageName = 'test.png';
			const options: any = {output:'blob', full: true};
			const text = this.cytoInstance.png(options);
			const blobType = 'image/png';
			const blob = new Blob([text], { type: blobType});
			this.saveAsFile(blob, imageName);
		}
	}

	private saveAsFile(blob: Blob, fileName: string){
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

	private addEdge() {
		console.log('addEdge');
	}
	private showHoverInfo() {
		console.log('showHoverInfo');
	}

}
