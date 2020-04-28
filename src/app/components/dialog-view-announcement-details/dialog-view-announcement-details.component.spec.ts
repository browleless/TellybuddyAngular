import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewAnnouncementDetailsComponent } from './dialog-view-announcement-details.component';

describe('DialogViewAnnouncementDetailsComponent', () => {
  let component: DialogViewAnnouncementDetailsComponent;
  let fixture: ComponentFixture<DialogViewAnnouncementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogViewAnnouncementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogViewAnnouncementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
