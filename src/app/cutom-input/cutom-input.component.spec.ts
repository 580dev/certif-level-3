import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomInputComponent } from './cutom-input.component';

describe('CutomInputComponent', () => {
  let component: CutomInputComponent;
  let fixture: ComponentFixture<CutomInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CutomInputComponent]
    });
    fixture = TestBed.createComponent(CutomInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
