import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFamilyGroupDetailsComponent } from './view-family-group-details.component';

describe('ViewFamilyGroupDetailsComponent', () => {
    let component: ViewFamilyGroupDetailsComponent;
    let fixture: ComponentFixture<ViewFamilyGroupDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewFamilyGroupDetailsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewFamilyGroupDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
