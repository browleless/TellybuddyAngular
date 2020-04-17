import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnAdditionalUnitsComponent } from './earn-additional-units.component';

describe('EarnAdditionalUnitsComponent', () => {
  let component: EarnAdditionalUnitsComponent;
  let fixture: ComponentFixture<EarnAdditionalUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnAdditionalUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnAdditionalUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
