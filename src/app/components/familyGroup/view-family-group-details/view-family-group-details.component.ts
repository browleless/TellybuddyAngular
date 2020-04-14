import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilyGroupService } from 'src/app/service/family-group.service';
import { SessionService } from 'src/app/service/session.service';
import { FamilyGroup } from 'src/app/classes/family-group';
import { Customer } from 'src/app/classes/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'src/app/classes/subscription';
import { SubscriptionService } from 'src/app/service/subscription.service';

@Component({
    selector: 'app-view-family-group-details',
    templateUrl: './view-family-group-details.component.html',
    styleUrls: ['./view-family-group-details.component.css'],
})
export class ViewFamilyGroupDetailsComponent implements OnInit {
    familyGroup: FamilyGroup;
    customer: Customer;
    subscriptions: Subscription[];
    selectedSubscription: Subscription;
    //++++++++++++++++++++++++++++++++++++++++++++++
    currentSMSUnits: number;
    currentDataUnits: number;
    currentTalkTimeUnits: number;
    //++++++++++++++++++++++++++++++++++++++++++++++
    retrieveFamilyGroupError: boolean;
    loaded: boolean;
    panelOpenState: boolean;

    donateSMSValue = 0;
    donateDataValue = 0;
    donateTalkTimeValue = 0;
    ownerOfFamilyGroup: boolean;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService,
        private familyGroupService: FamilyGroupService,
        private customerService: CustomerService,
        private subscriptionService: SubscriptionService
    ) {
        this.retrieveFamilyGroupError = false;
        this.loaded = false;
        this.panelOpenState = false;
    }

    ngOnInit() {
        this.familyGroupService.getFamilyGroupUnderThisCustomer().subscribe(
            (response) => {
                this.familyGroup = response.familyGroup;
                this.loaded = true;
            },
            (error) => {
                this.retrieveFamilyGroupError = true;
                this.loaded = true;
                console.log(
                    '********** ViewFamilyGroupDetailsComponent.ts: ' + error
                );
            }
        );
        this.subscriptionService.retrieveAllCustomerSubscriptions().subscribe(
            (response) => {
                this.subscriptions = response.subscriptions;
            },
            (error) => {
                console.log(
                    '********** ViewFamilyGroupDetailsComponent.ts: ' + error
                );
            }
        );
        //    this.subscriptions = this.subscriptions.filter((obj) => obj.isActive);
        this.customerService.retrieveCurrentCustomer().subscribe(
            (response) => {
                this.customer = response.customer;

                if (this.customer.ownerOfFamilyGroup) {
                    this.ownerOfFamilyGroup = true;
                } else {
                    this.ownerOfFamilyGroup = false;
                }
            },
            (error) => {
                console.log(
                    '********** ViewFamilyGroupDetailsComponent.ts: ' + error
                );
            }
        );
    }

    /* donate(donateUnitsForm: NgForm) {
        let longTagIds: number[] = new Array();

        for (var i = 0; i < this.tagIds.length; i++) {
            longTagIds.push(parseInt(this.tagIds[i]));
        }

        this.submitted = true;

        if (createProductForm.valid) {
            this.productService
                .createNewProduct(this.newProduct, this.categoryId, longTagIds)
                .subscribe(
                    (response) => {
                        let newProductId: number = response.productId;
                        this.resultSuccess = true;
                        this.resultError = false;
                        this.message =
                            'New product ' +
                            newProductId +
                            ' created successfully';
                    },
                    (error) => {
                        this.resultError = true;
                        this.resultSuccess = false;
                        this.message =
                            'An error has occurred while creating the new product: ' +
                            error;

                        console.log(
                            '********** CreateNewProductComponent.ts: ' + error
                        );
                    }
                );
        }
    }*/
}
