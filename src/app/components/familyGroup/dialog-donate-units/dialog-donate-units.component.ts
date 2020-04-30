import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogDonateUnitsData } from './dialog-donate-units-data';
import { Subscription } from 'src/app/classes/subscription';
import { FamilyGroupService } from 'src/app/service/family-group.service';

@Component({
    selector: 'app-dialog-donate-units',
    templateUrl: './dialog-donate-units.component.html',
    styleUrls: ['./dialog-donate-units.component.css'],
})
export class DialogDonateUnitsComponent implements OnInit {
    @ViewChild('dataSlider', { static: false }) dataSlider;
    @ViewChild('smsSlider', { static: false }) smsSlider;
    @ViewChild('talktimeSlider', { static: false }) talktimeSlider;
    loaded: boolean = false;
    currentCustomerSubscription: Subscription[];
    selectedSubscription: Subscription = {
        subscriptionId: undefined,
        dataUnits: {
            allocated: 0,
            nextMonth: 0,
            donated: 0,
            addOn: 0,
            familyGroup: 0,
            quizExtraUnits: 0,
        },
        talkTimeUnits: {
            allocated: 0,
            nextMonth: 0,
            donated: 0,
            addOn: 0,
            familyGroup: 0,
            quizExtraUnits: 0,
        },
        smsUnits: {
            allocated: 0,
            nextMonth: 0,
            donated: 0,
            addOn: 0,
            familyGroup: 0,
            quizExtraUnits: 0,
        },
        subscriptionStatusEnum: undefined,
        isActive: undefined,
        isContract: undefined,
        subscriptionStartDate: undefined,
        subscriptionEndDate: undefined,
        customer: undefined,
        usageDetails: undefined,
        plan: undefined,
        phoneNumber: undefined,
        outstandingBills: undefined,
    };
    donatedSMS: number = 0;
    donatedData: number = 0;
    donatedTalkTime: number = 0;

    smsLeft: number;
    dataLeft: number;
    talkTimeLeft: number;

    constructor(
        private familyGroupService: FamilyGroupService,
        public dialogRef: MatDialogRef<DialogDonateUnitsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogDonateUnitsData,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.loaded = true;
        this.currentCustomerSubscription = this.data.currentCustomerSubscription;
    }

    selectSubscription(subscription: Subscription): void {
        this.selectedSubscription = subscription;
        this.donatedTalkTime = 0;
        this.donatedData = 0;
        this.donatedSMS = 0;

        this.dataLeft = 0;
        this.talkTimeLeft = 0;
        this.smsLeft = 0;

        this.dataLeft =
            this.selectedSubscription.dataUnits['allocated'] +
            this.selectedSubscription.dataUnits['addOn'] +
            this.selectedSubscription.dataUnits['familyGroup'] +
            this.selectedSubscription.dataUnits['quizExtraUnits'] -
            this.selectedSubscription.dataUnits['donated'] -
            Math.floor(
                this.selectedSubscription.usageDetails[
                    this.selectedSubscription.usageDetails.length - 1
                ].dataUsage / this.selectedSubscription.plan.dataConversionRate
            );

        this.talkTimeLeft =
            this.selectedSubscription.talkTimeUnits['allocated'] +
            this.selectedSubscription.talkTimeUnits['addOn'] +
            this.selectedSubscription.talkTimeUnits['familyGroup'] +
            this.selectedSubscription.talkTimeUnits['quizExtraUnits'] -
            this.selectedSubscription.talkTimeUnits['donated'] -
            Math.floor(
                this.selectedSubscription.usageDetails[
                    this.selectedSubscription.usageDetails.length - 1
                ].talktimeUsage /
                    this.selectedSubscription.plan.talktimeConversionRate
            );

        this.smsLeft =
            this.selectedSubscription.smsUnits['allocated'] +
            this.selectedSubscription.smsUnits['addOn'] +
            this.selectedSubscription.smsUnits['familyGroup'] +
            this.selectedSubscription.smsUnits['quizExtraUnits'] -
            this.selectedSubscription.smsUnits['donated'] -
            Math.floor(
                this.selectedSubscription.usageDetails[
                    this.selectedSubscription.usageDetails.length - 1
                ].smsUsage / this.selectedSubscription.plan.smsConversionRate
            );
    }

    onExitClick(): void {
        this.dialogRef.close();
    }

    donate() {
        this.familyGroupService
            .donateUnitsToFamilyGroup(
                this.donatedData,
                this.donatedSMS,
                this.donatedTalkTime,
                this.selectedSubscription,
                this.data.currentCustomer,
                this.data.currentFamilyGroup
            )
            .subscribe(
                (response) => {
                    const snackBar = this.snackBar.open('Donation successful!');
                    location.reload();
                },
                (error) => {
                    const snackBarRef = this.snackBar.open(error, '', {
                        duration: 4500,
                    });

                    console.log(
                        '********** ViewFamilyGroupDetailsComponent.ts: ' +
                            error
                    );
                }
            );
        this.dialogRef.close();
    }
}
