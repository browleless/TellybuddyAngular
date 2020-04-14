import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewFamilyGroupComponent } from './create-new-family-group.component';

describe('CreateNewFamilyGroupComponent', () => {
  let component: CreateNewFamilyGroupComponent;
  let fixture: ComponentFixture<CreateNewFamilyGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewFamilyGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewFamilyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
