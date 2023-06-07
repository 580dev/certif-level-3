import { Directive, ElementRef, Input } from '@angular/core';
import { highlighInterface } from 'src/app/data.models';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  constructor(private elementRef: ElementRef) {}

  @Input() set highlight(textHighlight: highlighInterface) {
    let textToHighlight = textHighlight.textToHighlight.toLowerCase()
    let searchText = textHighlight.searchText?.toLowerCase()

    const regex = new RegExp(`(${searchText})`, 'gi');
    const highlightedText = textToHighlight.replace(regex, match => `<span style="font-weight: bold">${match}</span>`);
    this.elementRef.nativeElement.innerHTML = highlightedText;    
  }

}
