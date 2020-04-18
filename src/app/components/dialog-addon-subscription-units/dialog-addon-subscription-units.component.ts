import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

import { SubscriptionService } from 'src/app/service/subscription.service';
import { Subscription } from 'src/app/classes/subscription';
import { Plan } from 'src/app/classes/plan';
import { DialogConfigureSubscription } from './dialog-amend-subscription';

@Component({
    selector: 'app-dialog-addon-subscription-units',
    templateUrl: './dialog-addon-subscription-units.component.html',
    styleUrls: ['./dialog-addon-subscription-units.component.css'],
})
export class DialogAddonSubscriptionUnits implements OnInit {
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
    price: number = 0;

    loaded: boolean = false;
    selectedSubscriptionIndex = -1;

    constructor(
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: DialogConfigureSubscription,
        private activatedRoute: ActivatedRoute,
        public dialogRef: MatDialogRef<DialogAddonSubscriptionUnits>,
        private subscriptionService: SubscriptionService,
        private snackBar: MatSnackBar
    ) {
        this.selectedSubscription = this.data.selectedSubscription;
        this.selectedSubscriptionPlan = this.selectedSubscription.plan;
        this.dataUnits = 0;
        this.smsUnits = 0;
        this.talktimeUnits = 0;
        this.totalUnits = this.selectedSubscriptionPlan.totalBasicUnits;
    }

    ngOnInit() {
    }

    calculatePrice(): void {
        this.price = this.selectedSubscriptionPlan.addOnPrice * (this.dataUnits + this.smsUnits + this.talktimeUnits);
    }

    onExitClick(): void {
        this.dialogRef.close();
        this.loaded = false;
    }

    allocateAddonUnitsForCurrentMonth(): void {
        if( this.dataUnits != 0 ||
            this.smsUnits != 0 ||
            this.talktimeUnits != 0)
            {
                this.subscriptionService.allocateAddOnUnits(this.selectedSubscription, this.dataUnits, this.smsUnits, this.talktimeUnits).subscribe(
                    (response) => {
                        console.log("Subscription Id: " + response.subscriptionId + " has been edited");
                    },
                    (error) => {
                        console.log(error);
                    }
                );
                this.snackBar.open(
                    'Congratulations! Successfully purchased add-on units! The extra charges would be reflected in your bill',
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
