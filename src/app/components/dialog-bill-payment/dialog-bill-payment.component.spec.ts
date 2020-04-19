import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBillPaymentComponent } from './dialog-bill-payment.component';

describe('DialogBillPaymentComponent', () => {
  let component: DialogBillPaymentComponent;
  let fixture: ComponentFixture<DialogBillPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBillPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
