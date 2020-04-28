import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfigureContractPlanData } from './dialog-configure-contract-plan-data';

import { PhoneNumber } from 'src/app/classes/phone-number';
import { TransactionLineItem } from 'src/app/classes/transaction-line-item';

import { PhoneNumberService } from 'src/app/service/phone-number.service';
import { SessionService } from 'src/app/service/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-dialog-configure-contract-plan',
    templateUrl: './dialog-configure-contract-plan.component.html',
    styleUrls: ['./dialog-configure-contract-plan.component.css'],
})
export class DialogConfigureContractPlanComponent implements OnInit {
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

    newMobileLineItem: TransactionLineItem;
    newPlanLineItem: TransactionLineItem;

    constructor(
        public dialogRef: MatDialogRef<DialogConfigureContractPlanComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogConfigureContractPlanData,
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

    completeBundlePlan(): void {
        let mobileLineItem: TransactionLineItem = {
            product: undefined,
            transactionLineItemId: undefined,
            price: this.data.selectedProduct.price,
            quantity: 1,
            subtotal: this.data.selectedProduct.price,
            transaction: undefined,
            subscription: undefined,
            productItem: {
                productItemId: undefined,
                serialNumber: undefined,
                price: this.data.selectedProduct.price,
                luxuryProduct: {
                    serialNumber: undefined,
                    productItems: undefined,
                    productId: this.data.selectedProduct.productId,
                    skuCode: this.data.selectedProduct.skuCode,
                    name: this.data.selectedProduct.name,
                    description: this.data.selectedProduct.description,
                    price: this.data.selectedProduct.price,
                    quantityOnHand: this.data.selectedProduct.quantityOnHand,
                    reorderQuantity: this.data.selectedProduct.reorderQuantity,
                    productImagePath: this.data.selectedProduct
                        .productImagePath,
                    tags: this.data.selectedProduct.tags,
                    category: this.data.selectedProduct.category,
                    dealStartTime: this.data.selectedProduct.dealStartTime,
                    dealEndTime: this.data.selectedProduct.dealEndTime,
                    discountPrice: this.data.selectedProduct.discountPrice,
                },
            },
        };

        let planLineItem: TransactionLineItem = {
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
                isContract: true,
                usageDetails: undefined,
                phoneNumber: this.selectedPhoneNumber,
                plan: this.data.selectedPlan,
                outstandingBills: undefined,
            },
            transactionLineItemId: undefined,
            transaction: undefined,
            productItem: undefined,
            product: undefined,
            price: this.data.selectedPlan.price,
            quantity: 1,
            subtotal: this.data.selectedPlan.price,
        };

        mobileLineItem.subscription = planLineItem.subscription;
        planLineItem.productItem = mobileLineItem.productItem;

        this.newMobileLineItem = mobileLineItem;
        this.newPlanLineItem = planLineItem;

        //give 20% discount to the mobile device
        var discountedHandSet: number = parseFloat(
            (this.newMobileLineItem.price * 0.8).toFixed(2)
        );
        this.newMobileLineItem.price = discountedHandSet;
        this.newMobileLineItem.subtotal = discountedHandSet;
        this.newMobileLineItem.productItem.price = discountedHandSet;
        this.newMobileLineItem.productItem.luxuryProduct.price = discountedHandSet;

        //add to cart
        this.addBundlePlanToCart(this.newPlanLineItem, this.newMobileLineItem);
    }

    addBundlePlanToCart(
        newPlanLineItem: TransactionLineItem,
        newMobileLineItem: TransactionLineItem
    ): void {
        this.sessionService.addToCart(newMobileLineItem);
        this.sessionService.addToCart(newPlanLineItem);

        const snackBarRef = this.snackBar.open(
            'Successfully added Bundle to the cart!',
            'Undo',
            {
                duration: 4500,
            }
        );

        this.dialogRef.close();

        snackBarRef.onAction().subscribe(() => {
            this.sessionService.removeBundleFromCartNoParams();
        });
    }
}
