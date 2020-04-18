import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

import { SubscriptionService } from 'src/app/service/subscription.service';
import { Subscription } from 'src/app/classes/subscription';
import { Plan } from 'src/app/classes/plan';
import { DialogConfigureSubscription } from './dialog-amend-subscription';

@Component({
    selector: 'app-dialog-amend-subscription-units',
    templateUrl: './dialog-amend-subscription-units.component.html',
    styleUrls: ['./dialog-amend-subscription-units.component.css'],
})
export class DialogAmendSubscriptionUnits implements OnInit {
    @ViewChild('dataSlider', { static: false }) dataSlider;
    @ViewChild('smsSlider', { static: false }) smsSlider;
    @ViewChild('talktimeSlider', { static: false }) talktimeSlider;

    selectedSubscription: Subscription;
    selectedSubscriptionPlan: Plan;

    totalUnits: number;
    dataUnits: number;
    smsUnits: number;
    talktimeUnits: number;
    dataConversionRate: number;
    smsConversionRate: number;
    talktimeConversionRate: number;

    loaded: boolean = false;
    selectedSubscriptionIndex = -1;

    constructor(
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: DialogConfigureSubscription,
        private activatedRoute: ActivatedRoute,
        public dialogRef: MatDialogRef<DialogAmendSubscriptionUnits>,
        private subscriptionService: SubscriptionService,
        private snackBar: MatSnackBar
    ) {
        this.selectedSubscription = this.data.selectedSubscription;
        this.selectedSubscriptionPlan = this.selectedSubscription.plan;
        this.dataUnits = this.selectedSubscription.dataUnits["allocated"];
        this.smsUnits = this.selectedSubscription.smsUnits["allocated"];
        this.talktimeUnits = this.selectedSubscription.talkTimeUnits["allocated"];
        this.totalUnits = this.selectedSubscription.plan.totalBasicUnits;

    }

    ngOnInit() {
        // this.dataSlider.value = this.dataUnits;
        // this.smsSlider.value = this.smsUnits;
        // this.talktimeSlider.value = this.talktimeUnits;
        // this.loaded = true;
    }

    handleDataSliderChange(value: number): void {
        if (
            value - this.dataUnits <= this.getRemainingUnits() ||
            value <= this.dataUnits
        ) {
            this.dataUnits = value;
        } else {
            this.dataSlider.value = this.dataUnits;
        }
    }

    handleSmsSliderChange(value: number): void {
        if (
            value - this.smsUnits <= this.getRemainingUnits() ||
            value <= this.smsUnits
        ) {
            this.smsUnits = value;
        } else {
            this.smsSlider.value = this.smsUnits;
        }
    }

    handleTalktimeSliderChange(value: number): void {
        if (
            value - this.talktimeUnits <= this.getRemainingUnits() ||
            value <= this.talktimeUnits
        ) {
            this.talktimeUnits = value;
        } else {
            this.talktimeSlider.value = this.talktimeUnits;
        }
    }

    getRemainingUnits(): number {
        return (
            this.totalUnits -
            this.dataUnits -
            this.smsUnits -
            this.talktimeUnits
        );
    }

    onExitClick(): void {
        this.dialogRef.close();
        this.loaded = false;
    }

    allocateUnitsForNextMonth(): void {
        if( this.dataUnits != this.selectedSubscription.dataUnits["allocated"] ||
            this.smsUnits != this.selectedSubscription.smsUnits["allocated"] ||
            this.talktimeUnits != this.selectedSubscription.talkTimeUnits["allocated"])
            {
                this.subscriptionService.amendSubscriptionUnits(this.selectedSubscription, this.dataUnits, this.smsUnits, this.talktimeUnits).subscribe(
                    (response) => {
                        console.log("Subscription Id: " + response.subscriptionId + " has been edited");
                    },
                    (error) => {
                        console.log(error);
                    }
                );
                this.snackBar.open(
                    'Successfully amended allocation of units!\n\nChanges would be reflected from the next billing cycle',
                    'Close',
                    {
                        duration: 4500,
                    }
                );
                this.onExitClick();

        } else{
            this.snackBar.open(
                'No Changes have been made!',
                '',
                {
                    duration: 1500,
                }
            );
        }
      
    }
}
