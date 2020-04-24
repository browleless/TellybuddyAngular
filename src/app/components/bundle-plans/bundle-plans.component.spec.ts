import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlePlansComponent } from './bundle-plans.component';

describe('BundlePlansComponent', () => {
  let component: BundlePlansComponent;
  let fixture: ComponentFixture<BundlePlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundlePlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundlePlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
