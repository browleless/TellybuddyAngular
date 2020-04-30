import { Component, OnInit } from '@angular/core';
import { FamilyGroup } from 'src/app/classes/family-group';
import { Customer } from 'src/app/classes/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
import { CustomerService } from 'src/app/service/customer.service';
import { FamilyGroupService } from 'src/app/service/family-group.service';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-view-settings',
    templateUrl: './view-settings.component.html',
    styleUrls: ['./view-settings.component.css'],
})
export class ViewSettingsComponent implements OnInit {
    customer: Customer;
    familyGroupToPerformAction: FamilyGroup;
    loaded: boolean = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService,
        private customerService: CustomerService,
        private familyGroupService: FamilyGroupService
    ) {
        this.familyGroupToPerformAction = new FamilyGroup();
    }

    ngOnInit() {
        this.customer = this.sessionService.getCurrentCustomer();
        this.familyGroupService.getFamilyGroupUnderThisCustomer().subscribe(
            (response) => {
                this.familyGroupToPerformAction = response.familyGroup;
                this.loaded = true;
            },
            (error) => {
                console.log('********** ViewSettingComponent.ts: ' + error);
            }
        );
    }

    updateFamilyGroup() {
        this.familyGroupService
            .updateFamilyGroup(this.familyGroupToPerformAction)
            .subscribe(
                (response) => {
                    location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    deleteFamilyGroup() {
        this.familyGroupService
            .deleteFamilyGroup(this.familyGroupToPerformAction.familyGroupId)
            .subscribe(
                (response) => {
                    location.href = 'familyGroup/viewFamilyGroupDetails';
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}
