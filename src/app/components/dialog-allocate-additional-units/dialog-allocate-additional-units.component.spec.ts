import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAllocateAdditionalUnitsComponent } from './dialog-allocate-additional-units.component';

describe('DialogAllocateAdditionalUnitsComponent', () => {
  let component: DialogAllocateAdditionalUnitsComponent;
  let fixture: ComponentFixture<DialogAllocateAdditionalUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAllocateAdditionalUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAllocateAdditionalUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
