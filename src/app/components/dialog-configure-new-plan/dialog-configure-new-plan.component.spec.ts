import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfigureNewPlanComponent } from './dialog-configure-new-plan.component';

describe('DialogConfigureNewPlanComponent', () => {
  let component: DialogConfigureNewPlanComponent;
  let fixture: ComponentFixture<DialogConfigureNewPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfigureNewPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfigureNewPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
