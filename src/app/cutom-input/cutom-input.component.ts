import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cutom-input',
  templateUrl: './cutom-input.component.html',
  styleUrls: ['./cutom-input.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CutomInputComponent {

  @Input() items : Array<any> | undefined
  @Input() placeholder!: string
  @Output() selectedChanges = new EventEmitter<any>();

  displayList: boolean = false

  searchControl = new FormControl();

  onSelected(value: any) {
    this.selectedChanges.emit(value)
    this.searchControl.setValue(value.name)
    this.displayList = false
  }

  onSearch($event: any) {
    this.displayList = true
  }

  openPreview() {
    this.displayList = true
  }

  closePreview() {
    this.displayList = false
    // this.searchControl.setValue("")
  }

}
