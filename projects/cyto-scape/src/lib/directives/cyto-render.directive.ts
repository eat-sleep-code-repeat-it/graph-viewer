import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[cytoRender]',
})
export class CytoRenderDirective {
  @Input('cytoRender') bgColor: string;
  @HostListener('mouseenter') onMouseEnter() {
    this.setBgColor(this.bgColor || this.defaultBgColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBgColor(this.defaultBgColor);
  }

  defaultBgColor = 'wheat';
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  ngOnInit() {}

  private setBgColor(color: string) {
    // this.elementRef.nativeElement.style.backgroundColor = color;
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', color);
  }


}
