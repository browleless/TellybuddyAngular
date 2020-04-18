import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAmendSubscriptionUnits } from './dialog-amend-subscription-units.component';

describe('DialogAmendSubscriptionUnits', () => {
  let component: DialogAmendSubscriptionUnits;
  let fixture: ComponentFixture<DialogAmendSubscriptionUnits>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAmendSubscriptionUnits ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAmendSubscriptionUnits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
