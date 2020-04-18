import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRecommendPlansComponent } from './dialog-recommend-plans.component';

describe('DialogRecommendPlansComponent', () => {
  let component: DialogRecommendPlansComponent;
  let fixture: ComponentFixture<DialogRecommendPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRecommendPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRecommendPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
