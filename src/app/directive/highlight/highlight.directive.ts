import { Directive, ElementRef, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  constructor(private elementRef: ElementRef) {}

  @Input() set highlight(textHighlight: string[]) {
    let textToHighlight = textHighlight[0]?.toLowerCase()
    let searchText = textHighlight[1]?.toLowerCase()

    const regex = new RegExp(`(${searchText})`, 'gi');
    const highlightedText = textToHighlight.replace(regex, match => `<span style="font-weight: bold">${match}</span>`);
    this.elementRef.nativeElement.innerHTML = highlightedText;    
  }

}
