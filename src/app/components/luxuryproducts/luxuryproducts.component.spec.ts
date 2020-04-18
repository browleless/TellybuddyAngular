import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxuryproductsComponent } from './luxuryproducts.component';

describe('LuxuryproductsComponent', () => {
  let component: LuxuryproductsComponent;
  let fixture: ComponentFixture<LuxuryproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuxuryproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxuryproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
