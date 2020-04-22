import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from 'src/app/classes/customer';
import { SessionService } from 'src/app/service/session.service';
import { FamilyGroupService } from 'src/app/service/family-group.service';
import { FamilyGroup } from 'src/app/classes/family-group';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-create-new-family-group',
    templateUrl: './create-new-family-group.component.html',
    styleUrls: ['./create-new-family-group.component.css'],
})
export class CreateNewFamilyGroupComponent implements OnInit {
    verifyAddressFormGroup: FormGroup;
    descriptionFormGroup: FormGroup;
    customer: Customer;
    newFamilyGroup: FamilyGroup;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private _formBuilder: FormBuilder,
        public sessionService: SessionService,
        private customerService: CustomerService,
        private familyGroupService: FamilyGroupService
    ) {
        this.newFamilyGroup = new FamilyGroup();
    }

    ngOnInit() {
        this.customerService.retrieveCurrentCustomer().subscribe(
            (response) => {
                this.customer = response.customer;
            },
            (error) => {
                console.log(
                    '********** ViewFamilyGroupDetailsComponent.ts: ' + error
                );
            }
        );
        this.verifyAddressFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required],
        });
        this.descriptionFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required],
        });
    }

    createFamilyGroup() {
        this.familyGroupService
            .createFamilyGroup(this.newFamilyGroup, this.customer)
            .subscribe(
                (response) => {
                    location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}
