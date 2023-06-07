import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickInsideOrOutside]'
})
export class ClickOutSideDirective {
 
  @Output() clickOutside = new EventEmitter<void>();
  @Output() clickInside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: any) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    } else {
      this.clickInside.emit();
    }
  }
}
