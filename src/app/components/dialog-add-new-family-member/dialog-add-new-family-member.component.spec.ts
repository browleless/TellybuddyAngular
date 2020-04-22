import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddNewFamilyMemberComponent } from './dialog-add-new-family-member.component';

describe('DialogAddNewFamilyMemberComponent', () => {
  let component: DialogAddNewFamilyMemberComponent;
  let fixture: ComponentFixture<DialogAddNewFamilyMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddNewFamilyMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddNewFamilyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
