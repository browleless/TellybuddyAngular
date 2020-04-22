import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReceiveUnitsComponent } from './dialog-receive-units.component';

describe('DialogReceiveUnitsComponent', () => {
  let component: DialogReceiveUnitsComponent;
  let fixture: ComponentFixture<DialogReceiveUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogReceiveUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReceiveUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
