import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilyGroupService } from 'src/app/service/family-group.service';
import { SessionService } from 'src/app/service/session.service';
import { FamilyGroup } from 'src/app/classes/family-group';
import { Customer } from 'src/app/classes/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'src/app/classes/subscription';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { MatDialog } from '@angular/material';
import { DialogReceiveUnitsComponent } from '../dialog-receive-units/dialog-receive-units.component';
import { DialogDonateUnitsComponent } from '../dialog-donate-units/dialog-donate-units.component';

@Component({
    selector: 'app-view-family-group-details',
    templateUrl: './view-family-group-details.component.html',
    styleUrls: ['./view-family-group-details.component.css'],
})
export class ViewFamilyGroupDetailsComponent implements OnInit {
    familyGroup: FamilyGroup;
    customer: Customer;
    subscriptions: Subscription[];
    // selectedSubscription: Subscription = {
    //     subscriptionId: undefined,
    //     dataUnits: {
    //         allocated: 0,
    //         nextMonth: 0,
    //         donated: 0,
    //         addOn: 0,
    //         familyGroup: 0,
    //         quizExtraUnits: 0,
    //     },
    //     talkTimeUnits: {
    //         allocated: 0,
    //         nextMonth: 0,
    //         donated: 0,
    //         addOn: 0,
    //         familyGroup: 0,
    //         quizExtraUnits: 0,
    //     },
    //     smsUnits: {
    //         allocated: 0,
    //         nextMonth: 0,
    //         donated: 0,
    //         addOn: 0,
    //         familyGroup: 0,
    //         quizExtraUnits: 0,
    //     },
    //     subscriptionStatusEnum: undefined,
    //     isActive: undefined,
    //     subscriptionStartDate: undefined,
    //     subscriptionEndDate: undefined,
    //     customer: undefined,
    //     usageDetails: undefined,
    //     plan: undefined,
    //     phoneNumber: undefined,
    // };
    //++++++++++++++++++++++++++++++++++++++++++++++
    @ViewChild('dataSlider', { static: false }) dataSlider;
    @ViewChild('smsSlider', { static: false }) smsSlider;
    @ViewChild('talktimeSlider', { static: false }) talktimeSlider;

    donateSMSValue = 0;
    donateDataValue = 0;
    donateTalkTimeValue = 0;

    smsUnitsLeft: number;
    dataUnitsLeft: number;
    talkTimeUnitsLeft: number;

    //++++++++++++++++++++++++++++++++++++++++++++++
    retrieveFamilyGroupError: boolean;
    loaded: boolean;
    panelOpenState: boolean;

    ownerOfFamilyGroup: boolean;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService,
        private familyGroupService: FamilyGroupService,
        private customerService: CustomerService,
        private subscriptionService: SubscriptionService,
        public dialog: MatDialog
    ) {
        this.retrieveFamilyGroupError = false;
        this.loaded = false;
        this.panelOpenState = false;
        this.customer = new Customer();
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

        this.customerService.retrieveCurrentCustomer().subscribe(
            (response) => {
                this.customer = response.customer;
                this.subscriptionService
                    .retrieveActiveSubscriptionUnderCustomer(
                        this.customer.customerId
                    )
                    .subscribe(
                        (response) => {
                            this.subscriptions = response.activeSubscriptions;
                            // this.selectedSubscription = this.subscriptions[0];
                        },
                        (error) => {
                            console.log(
                                '********** ViewFamilyGroupDetailsComponent.ts: ' +
                                    error
                            );
                        }
                    );
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
    openDonateDialog(): void {
        this.dialog.open(DialogDonateUnitsComponent, {
            data: {
                currentCustomer: this.customer,
                currentCustomerSubscription: this.subscriptions,
                currentFamilyGroup: this.familyGroup,
            },
        });
    }
    openReceiveDialog(): void {
        this.dialog.open(DialogReceiveUnitsComponent, {
            data: {
                currentCustomer: this.customer,
                currentCustomerSubscription: this.subscriptions,
                currentFamilyGroup: this.familyGroup,
            },
        });
    }

    // selectSubscription(event): void {
    //     this.selectedSubscription = event.source.value;
    //     console.log(this.selectedSubscription.subscriptionId);
    //     console.log(this.selectedSubscription.dataUnits['allocated']);
    // }

    // handleDataSliderChange(value: number): void {
    //     if (this.selectedSubscription != null) {
    //         if (
    //             value - this.donateDataValue <= this.getRemainingDataUnits() ||
    //             value <= this.donateDataValue
    //         ) {
    //             this.donateDataValue = value;
    //         } else {
    //             this.dataSlider.value = this.donateDataValue;
    //         }
    //     }
    // }

    // handleSmsSliderChange(value: number): void {
    //     if (this.selectedSubscription != null) {
    //         if (
    //             value - this.donateSMSValue <= this.getRemainingSMSUnits() ||
    //             value <= this.donateSMSValue
    //         ) {
    //             this.donateSMSValue = value;
    //         } else {
    //             this.smsSlider.value = this.donateSMSValue;
    //         }
    //     }
    // }

    // handleTalktimeSliderChange(value: number): void {
    //     if (this.selectedSubscription != null) {
    //         if (
    //             value - this.donateTalkTimeValue <=
    //                 this.getRemainingTalkTimeUnits() ||
    //             value <= this.donateTalkTimeValue
    //         ) {
    //             this.donateTalkTimeValue = value;
    //         } else {
    //             this.talktimeSlider.value = this.donateTalkTimeValue;
    //         }
    //     }
    // }
    // getRemainingDataUnits(): number {
    //     return this.selectedSubscription.dataUnits['allocated'];
    //     // -this.selectedSubscription.usageDetails.pop().dataUsage
    // }
    // getRemainingSMSUnits(): number {
    //     return this.selectedSubscription.smsUnits['allocated'];
    //     // -this.selectedSubscription.usageDetails.pop().smsUsage
    // }
    // getRemainingTalkTimeUnits(): number {
    //     return this.selectedSubscription.talkTimeUnits['allocated'];
    //     // -this.selectedSubscription.usageDetails.pop().talktimeUsage
    // }

    // donate() {
    //     this.familyGroupService
    //         .donateUnitsToFamilyGroup(
    //             this.donateDataValue,
    //             this.donateSMSValue,
    //             this.donateTalkTimeValue,
    //             this.selectedSubscription,
    //             this.customer,
    //             this.familyGroup
    //         )
    //         .subscribe(
    //             (response) => {
    //                 location.reload();
    //             },
    //             (error) => {
    //                 console.log(error);
    //             }
    //         );
    // }
}
