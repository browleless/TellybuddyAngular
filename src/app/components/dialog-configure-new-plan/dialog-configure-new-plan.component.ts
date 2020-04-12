import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfigureNewPlanData } from './dialog-configure-new-plan-data';

import { PhoneNumber } from 'src/app/classes/phone-number';
import { TransactionLineItem } from 'src/app/classes/transaction-line-item';

import { PhoneNumberServiceService } from 'src/app/service/phone-number-service.service';
import { SessionService } from 'src/app/service/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-dialog-configure-new-plan',
    templateUrl: './dialog-configure-new-plan.component.html',
    styleUrls: ['./dialog-configure-new-plan.component.css'],
})
export class DialogConfigureNewPlanComponent implements OnInit {
    availablePhoneNumbers: PhoneNumber[];
    selectedPhoneNumber: PhoneNumber = {
        phoneNumberId: undefined,
        inUse: false,
        phoneNumber: undefined,
        subscription: undefined,
    };
    dataUnits: number = 1;
    smsUnits: number = 1;
    talktimeUnits: number = 1;
    loaded: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<DialogConfigureNewPlanComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogConfigureNewPlanData,
        private phoneNumberService: PhoneNumberServiceService,
        public sessionService: SessionService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
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
        this.selectedPhoneNumber.inUse = false;
        this.availablePhoneNumbers[index].inUse = true;
        this.selectedPhoneNumber = this.availablePhoneNumbers[index];
    }

    setDataUnits(value: number): void {
        if (
            value - this.dataUnits <= this.getRemainingUnits() ||
            value <= this.dataUnits
        ) {
            this.dataUnits = value;
        } else {
        }
    }

    addPlanToCart(): void {
        let newLineItem: TransactionLineItem = {
            subscription: {
                subscriptionId: undefined,
                dataUnits: new Map().set('allocatedUnits', this.dataUnits),
                talkTimeUnits: new Map().set(
                    'allocatedUnits',
                    this.talktimeUnits
                ),
                smsUnits: new Map().set('allocatedUnits', this.smsUnits),
                subscriptionStatusEnum: undefined,
                subscriptionStartDate: undefined,
                subscriptionEndDate: undefined,
                customer: undefined,
                isActive: undefined,
                usageDetails: undefined,
                phoneNumber: this.selectedPhoneNumber,
                plan: this.data.selectedPlan,
            },
            transactionLineItemId: undefined,
            transaction: this.sessionService.getCart(),
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

        console.log(this.sessionService.getCart());

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
