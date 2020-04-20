import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Subscription } from 'src/app/classes/subscription';
import { DialogReceiveUnitsData } from './dialog-receive-units-data';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FamilyGroupService } from 'src/app/service/family-group.service';

@Component({
    selector: 'app-dialog-receive-units',
    templateUrl: './dialog-receive-units.component.html',
    styleUrls: ['./dialog-receive-units.component.css'],
})
export class DialogReceiveUnitsComponent implements OnInit {
    @ViewChild('dataSlider', { static: false }) dataSlider;
    @ViewChild('smsSlider', { static: false }) smsSlider;
    @ViewChild('talktimeSlider', { static: false }) talktimeSlider;
    loaded: boolean = false;
    shakeIt = false;
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
        subscriptionStartDate: undefined,
        subscriptionEndDate: undefined,
        customer: undefined,
        usageDetails: undefined,
        plan: undefined,
        phoneNumber: undefined,
    };
    smsLeft: number;
    dataLeft: number;
    talkTimeLeft: number;
    receivedSMS: number = 0;
    receivedData: number = 0;
    receivedTalkTime: number = 0;

    constructor(
        private familyGroupService: FamilyGroupService,
        public dialogRef: MatDialogRef<DialogReceiveUnitsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogReceiveUnitsData,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.loaded = true;
        this.currentCustomerSubscription = this.data.currentCustomerSubscription;
    }

    selectSubscription(event): void {
        this.selectedSubscription = event.source.value;
        this.dataLeft =
            this.selectedSubscription.dataUnits['allocated'] +
            this.selectedSubscription.dataUnits['addOn'] +
            this.selectedSubscription.dataUnits['familyGroup'] +
            this.selectedSubscription.dataUnits['quizExtraUnits'] -
            this.selectedSubscription.dataUnits['donated'] -
            this.selectedSubscription.usageDetails[
                this.selectedSubscription.usageDetails.length - 1
            ].dataUsage;

        this.talkTimeLeft =
            this.selectedSubscription.talkTimeUnits['allocated'] +
            this.selectedSubscription.talkTimeUnits['addOn'] +
            this.selectedSubscription.talkTimeUnits['familyGroup'] +
            this.selectedSubscription.talkTimeUnits['quizExtraUnits'] -
            this.selectedSubscription.talkTimeUnits['donated'] -
            this.selectedSubscription.usageDetails[
                this.selectedSubscription.usageDetails.length - 1
            ].talktimeUsage;

        this.smsLeft =
            this.selectedSubscription.smsUnits['allocated'] +
            this.selectedSubscription.smsUnits['addOn'] +
            this.selectedSubscription.smsUnits['familyGroup'] +
            this.selectedSubscription.smsUnits['quizExtraUnits'] -
            this.selectedSubscription.smsUnits['donated'] -
            this.selectedSubscription.usageDetails[
                this.selectedSubscription.usageDetails.length - 1
            ].smsUsage;
    }

    handleDataSliderChange(value: number): void {
        if (
            value - this.receivedData <= this.getRemainingUnits() ||
            value <= this.receivedData
        ) {
            this.receivedData = value;
        } else {
            this.dataSlider.value = this.receivedData;
        }
    }

    handleSMSSliderChange(value: number): void {
        if (
            value - this.receivedSMS <= this.getRemainingUnits() ||
            value <= this.receivedSMS
        ) {
            this.receivedSMS = value;
        } else {
            this.smsSlider.value = this.receivedSMS;
        }
    }

    handleTalkTimeSliderChange(value: number): void {
        if (
            value - this.receivedTalkTime <= this.getRemainingUnits() ||
            value <= this.receivedTalkTime
        ) {
            this.receivedTalkTime = value;
        } else {
            this.talktimeSlider.value = this.receivedTalkTime;
        }
    }

    getRemainingUnits(): number {
        return (
            this.data.currentFamilyGroup.donatedUnits -
            this.receivedData -
            this.receivedSMS -
            this.receivedTalkTime
        );
    }

    onExitClick(): void {
        this.dialogRef.close();
    }
    shakeDialog() {
        this.shakeIt = true;
        setTimeout((arg) => {
            this.shakeIt = false;
        }, 300);
    }
    receive() {
        this.familyGroupService
            .consumeUnitsFromFamilyGroup(
                this.receivedData,
                this.receivedSMS,
                this.receivedTalkTime,
                this.selectedSubscription,
                this.data.currentCustomer,
                this.data.currentFamilyGroup
            )
            .subscribe(
                (response) => {
                    const snackBar = this.snackBar.open(
                        'Successfully received units!'
                    );
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
