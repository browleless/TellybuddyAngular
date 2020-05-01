import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Subscription } from 'src/app/classes/subscription';
import { DialogReceiveUnitsData } from './dialog-receive-units-data';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FamilyGroupService } from 'src/app/service/family-group.service';
import { Bill } from 'src/app/classes/bill';

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
        isContract: undefined,
        subscriptionStartDate: undefined,
        subscriptionEndDate: undefined,
        customer: undefined,
        usageDetails: undefined,
        plan: undefined,
        phoneNumber: undefined,
        outstandingBills: undefined,
    };
    allowedSms: number;
    allowedData: number;
    allowedTalktime: number;
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
        this.allowedData =
            this.selectedSubscription.dataUnits['allocated'] +
            this.selectedSubscription.dataUnits['addOn'] +
            this.selectedSubscription.dataUnits['familyGroup'] +
            this.selectedSubscription.dataUnits['quizExtraUnits'] -
            this.selectedSubscription.dataUnits['donated'];

        this.allowedTalktime =
            this.selectedSubscription.talkTimeUnits['allocated'] +
            this.selectedSubscription.talkTimeUnits['addOn'] +
            this.selectedSubscription.talkTimeUnits['familyGroup'] +
            this.selectedSubscription.talkTimeUnits['quizExtraUnits'] -
            this.selectedSubscription.talkTimeUnits['donated'];

        this.allowedSms =
            this.selectedSubscription.smsUnits['allocated'] +
            this.selectedSubscription.smsUnits['addOn'] +
            this.selectedSubscription.smsUnits['familyGroup'] +
            this.selectedSubscription.smsUnits['quizExtraUnits'] -
            this.selectedSubscription.smsUnits['donated'];
    }

    onExitClick(): void {
        this.dialogRef.close();
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
