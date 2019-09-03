import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  @Input('highlight') highlightColor: string;
  @Input() underline: boolean;

  constructor(private el: ElementRef, private renderer:Renderer2) { 
    //el.nativeElement.style.backgroundColor = 'yellowgreen';
  }

  @HostListener('mouseenter') onmouseenter() {
    this.highlight(this.highlightColor ? this.highlightColor : 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('#343a40');
    this.underline= false;
  }

  @HostListener('click') onclick() {
    this.highlight('orange');
  }
  
  private highlight(color: string){
    this.el.nativeElement.style.backgroundColor = color;
    if(this.underline){
      this.renderer.setStyle(this.el.nativeElement,"text-decoration","underline");
      //this.renderer.setStyle(this.el.nativeElement,'box-shadow', "2px 2px 12px #58A362");
    }
    else{
      this.renderer.setStyle(this.el.nativeElement,"text-decoration","none");
    }
    //this.renderer.setStyle(this.el.nativeElement,"display",'none');
  }
}