import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBillPaymentData } from './dialog-bill-payment-data';
import { MatSnackBar } from '@angular/material';
import {
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material';

import { SessionService } from 'src/app/service/session.service';
import { PaymentService } from 'src/app/service/payment.service';

import * as _moment from 'moment';
import { defaultFormat as _rollupMoment, Moment } from 'moment';

import { Payment } from 'src/app/classes/payment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'MM/YY',
    },
    display: {
        dateInput: 'MM/YY',
        monthYearLabel: 'MMM YY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YY',
    },
};

@Component({
    selector: 'app-dialog-bill-payment',
    templateUrl: './dialog-bill-payment.component.html',
    styleUrls: ['./dialog-bill-payment.component.css'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class DialogBillPaymentComponent implements OnInit {
    enteredCreditCardNumber: string = '';
    enteredCvv: string = '';
    creditCardExpiry = new FormControl(_moment());

    useLoyaltyPoints: boolean = false;
    loyaltyPointsUsed: number = 0;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public dialogRef: MatDialogRef<DialogBillPaymentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogBillPaymentData,
        public sessionService: SessionService,
        private paymentService: PaymentService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {}

    chosenYearHandler(normalizedYear: Moment) {
        const ctrlValue = this.creditCardExpiry.value;
        ctrlValue.year(normalizedYear.year());
        this.creditCardExpiry.setValue(ctrlValue);
    }

    chosenMonthHandler(
        normalizedMonth: Moment,
        datepicker: MatDatepicker<Moment>
    ) {
        const ctrlValue = this.creditCardExpiry.value;
        ctrlValue.month(normalizedMonth.month());
        this.creditCardExpiry.setValue(ctrlValue);
        datepicker.close();
    }

    decrementLoyaltyPoints(): void {
        if (this.loyaltyPointsUsed !== 0) {
            this.loyaltyPointsUsed = --this.loyaltyPointsUsed;
        }
    }

    toggleLoyaltyPoints(checked: boolean) {
        this.useLoyaltyPoints = checked;
        if (!checked) {
            this.loyaltyPointsUsed = 0;
        }
    }

    incrementLoyaltyPoints(): void {
        if (
            this.loyaltyPointsUsed < 5 &&
            this.loyaltyPointsUsed <
                this.sessionService.getCurrentCustomer().loyaltyPoints
        )
            this.loyaltyPointsUsed = ++this.loyaltyPointsUsed;
    }

    handlePayment(): void {
        let newPayment: Payment = {
            paymentId: undefined,
            amount:
                this.data.selectedBill.price *
                    ((100 - this.data.selectedBill.familyDiscountRate) / 100) +
                this.data.selectedBill.addOnPrice +
                this.data.selectedBill.exceedPenaltyPrice -
                this.loyaltyPointsUsed,
            creditCardNumber: this.enteredCreditCardNumber,
            cvv: this.enteredCvv,
            datePaid: undefined,
        };

        this.paymentService
            .createNewBillPayment(newPayment, this.data.selectedBill)
            .subscribe(
                (response) => {
                    this.snackBar.open('Payment successful!', 'Close', {
                        duration: 4500,
                    });
                    let customerToUpdate = this.sessionService.getCurrentCustomer();
                    customerToUpdate.loyaltyPoints =
                        customerToUpdate.loyaltyPoints - this.loyaltyPointsUsed;
                    this.sessionService.setCurrentCustomer(customerToUpdate);
                    this.dialogRef.close(true);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    onExitClick(): void {
        this.dialogRef.close();
    }
}
