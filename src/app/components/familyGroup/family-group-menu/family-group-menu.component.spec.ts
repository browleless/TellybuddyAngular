import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyGroupMenuComponent } from './family-group-menu.component';

describe('FamilyGroupMenuComponent', () => {
  let component: FamilyGroupMenuComponent;
  let fixture: ComponentFixture<FamilyGroupMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyGroupMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyGroupMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
