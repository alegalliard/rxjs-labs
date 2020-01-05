import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexCounterComponent } from './complex-counter.component';

describe('ComplexCounterComponent', () => {
  let component: ComplexCounterComponent;
  let fixture: ComponentFixture<ComplexCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
