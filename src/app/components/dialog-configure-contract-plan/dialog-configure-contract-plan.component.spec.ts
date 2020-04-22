import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfigureContractPlanComponent } from './dialog-configure-contract-plan.component';

describe('DialogConfigureContractPlanComponent', () => {
  let component: DialogConfigureContractPlanComponent;
  let fixture: ComponentFixture<DialogConfigureContractPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfigureContractPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfigureContractPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
