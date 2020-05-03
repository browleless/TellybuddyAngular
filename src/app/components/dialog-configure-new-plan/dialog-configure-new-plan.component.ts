import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfigureNewPlanData } from './dialog-configure-new-plan-data';

import { PhoneNumber } from 'src/app/classes/phone-number';
import { TransactionLineItem } from 'src/app/classes/transaction-line-item';

import { PhoneNumberService } from 'src/app/service/phone-number.service';
import { SessionService } from 'src/app/service/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-dialog-configure-new-plan',
    templateUrl: './dialog-configure-new-plan.component.html',
    styleUrls: ['./dialog-configure-new-plan.component.css'],
})
export class DialogConfigureNewPlanComponent implements OnInit {
    @ViewChild('dataSlider', { static: false }) dataSlider;
    @ViewChild('smsSlider', { static: false }) smsSlider;
    @ViewChild('talktimeSlider', { static: false }) talktimeSlider;

    availablePhoneNumbers: PhoneNumber[];
    selectedPhoneNumber: PhoneNumber;
    selectedPhoneNumberIndex: number = -1;
    dataUnits: number = 0;
    smsUnits: number = 0;
    talktimeUnits: number = 0;
    loaded: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<DialogConfigureNewPlanComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogConfigureNewPlanData,
        private phoneNumberService: PhoneNumberService,
        public sessionService: SessionService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.loaded = false;
        this.selectedPhoneNumberIndex = -1;
        this.selectedPhoneNumber = undefined;
        this.phoneNumberService.retrieveAllAvailablePhoneNumbers().subscribe(
            (response) => {
                this.availablePhoneNumbers = response.phoneNumbers;
                this.availablePhoneNumbers.sort(() => 0.5 - Math.random());
                this.availablePhoneNumbers = this.availablePhoneNumbers.slice(
                    0,
                    5
                );
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    selectPhoneNumber(index: number): void {
        this.selectedPhoneNumber = this.availablePhoneNumbers[index];
        this.selectedPhoneNumberIndex = index;
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

    addPlanToCart(): void {
        let newLineItem: TransactionLineItem = {
            subscription: {
                subscriptionId: undefined,
                dataUnits: {
                    allocated: this.dataUnits,
                },
                talkTimeUnits: {
                    allocated: this.talktimeUnits,
                },
                smsUnits: {
                    allocated: this.smsUnits,
                },
                subscriptionStatusEnum: undefined,
                subscriptionStartDate: undefined,
                subscriptionEndDate: undefined,
                customer: undefined,
                isActive: undefined,
                isContract: false,
                usageDetails: undefined,
                phoneNumber: this.selectedPhoneNumber,
                plan: this.data.selectedPlan,
                outstandingBills: undefined,
                contractEndDate: undefined,
            },
            transactionLineItemId: undefined,
            transaction: undefined,
            productItem: undefined,
            product: undefined,
            price: this.data.selectedPlan.price,
            quantity: 1,
            subtotal: this.data.selectedPlan.price,
        };

        this.sessionService.addToCart(newLineItem);

        const snackBarRef = this.snackBar.open(
            'Successfully added "' +
                this.data.selectedPlan.name +
                '" SIM plan to the cart!',
            'Undo',
            {
                duration: 4500,
            }
        );

        snackBarRef.onAction().subscribe(() => {
            this.sessionService.undoAddToCart();
        });

        this.dialogRef.close();
    }

    getRemainingUnits(): number {
        return (
            this.data.selectedPlan.totalBasicUnits -
            this.dataUnits -
            this.smsUnits -
            this.talktimeUnits
        );
    }

    onExitClick(): void {
        this.dialogRef.close();
    }
}
