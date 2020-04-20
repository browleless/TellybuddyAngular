import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDonateUnitsComponent } from './dialog-donate-units.component';

describe('DialogDonateUnitsComponent', () => {
  let component: DialogDonateUnitsComponent;
  let fixture: ComponentFixture<DialogDonateUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDonateUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDonateUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
