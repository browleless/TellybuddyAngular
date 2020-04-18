import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
import { DiscountCodeService } from 'src/app/service/discount-code.service';
import { TransactionService } from 'src/app/service/transaction.service';

import { Transaction } from 'src/app/classes/transaction';
import { DiscountCode } from 'src/app/classes/discount-code';

import * as _moment from 'moment';
import { defaultFormat as _rollupMoment, Moment } from 'moment';

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
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class CheckoutComponent implements OnInit {
    transaction: Transaction;
    loaded: boolean = false;
    isMobile: boolean = false;
    isTablet: boolean = false;
    isLaptop: boolean = false;

    enteredCreditCardNumber: string = '';
    enteredCvv: string = '';
    creditCardExpiry = new FormControl(_moment());

    enteredDiscountCode: string;
    selectedDiscountCode: string;
    discountRate: number = 0;
    discountCodeIndex: number;

    discountCodes: DiscountCode[];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService,
        private snackBar: MatSnackBar,
        private breakpointObserver: BreakpointObserver,
        private discountCodeService: DiscountCodeService,
        private transactionService: TransactionService
    ) {
        breakpointObserver
            .observe(['(max-width: 599px)'])
            .subscribe((result) => {
                this.isMobile = result.matches;
            });
        breakpointObserver
            .observe(['(max-width: 1279px)'])
            .subscribe((result) => {
                this.isTablet = result.matches;
                this.isMobile = false;
            });
        breakpointObserver
            .observe(['(max-width: 1919px)'])
            .subscribe((result) => {
                this.isLaptop = result.matches;
                this.isMobile = false;
                this.isTablet = false;
            });
    }

    ngOnInit() {
        this.transaction = this.sessionService.getCart();
        this.discountCodeService
            .retrieveAllUsableActiveDiscountCodes()
            .subscribe(
                (response) => {
                    this.discountCodes = response.discountCodes;
                    this.loaded = true;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    validateDiscountCode(): void {
        this.discountCodeIndex = this.discountCodes
            .map((code) => code.discountCode)
            .indexOf(this.enteredDiscountCode);

        if (this.discountCodeIndex !== -1) {
            this.selectedDiscountCode = this.enteredDiscountCode;
            this.discountRate = this.discountCodes[
                this.discountCodeIndex
            ].discountRate;

            this.snackBar.open(
                'Code "' +
                this.enteredDiscountCode +
                '" applied successfully! (-' +
                this.discountRate +
                '%)',
                'Close',
                {
                    duration: 4500,
                }
            );
        } else {
            this.snackBar.open(
                'Sorry, "' +
                this.enteredDiscountCode +
                '" is not a valid code!',
                'Close',
                {
                    duration: 4500,
                }
            );
        }
    }

    removeDiscount(): void {
        this.snackBar.open(
            'Discount code "' +
            this.enteredDiscountCode +
            '" removed successfully!',
            'Close',
            {
                duration: 4500,
            }
        );
        this.discountRate = 0;
        this.enteredDiscountCode = undefined;
    }

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

    handleCartCheckout(): void {
        this.loaded = false;

        let transaction = this.sessionService.getCart();

        // transaction.customer = this.sessionService.getCurrentCustomer();

        transaction.transactionLineItems.forEach((transactionLineItem) => {
            if (transactionLineItem.subscription) {
                transactionLineItem.subscription.customer = this.sessionService.getCurrentCustomer();
            }
        });

        if (this.discountRate) {
            transaction.discountCode = this.discountCodes[
                this.discountCodeIndex
            ];
        }

        transaction.totalPrice =
            this.getTotalCost() * ((100 - this.discountRate) / 100);

        const payment = {
            paymentId: undefined,
            creditCardNumber: this.enteredCreditCardNumber,
            cvv: this.enteredCvv,
            datePaid: undefined,
            amount: transaction.totalPrice,
        };

        transaction.payment = payment;

        this.transactionService.createNewTransaction(transaction).subscribe(
            (response) => {
                this.loaded = true;
                this.snackBar.open(
                    'Checkout successful! View your order now!',
                    'Close',
                    { duration: 4500 }
                );
                let newTransaction: Transaction = {
                    transactionId: undefined,
                    totalPrice: undefined,
                    voidRefund: false,
                    transactionDateTime: undefined,
                    transactionStatusEnum: undefined,
                    payment: undefined,
                    customer: undefined,
                    discountCode: undefined,
                    transactionLineItems: [],
                };
                this.sessionService.setCart(newTransaction);
                this.router.navigate(['/index']);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getTotalCost(): number {
        return this.transaction.transactionLineItems
            .map((t) => t.price * t.quantity)
            .reduce((acc, value) => acc + value, 0);
    }
}
