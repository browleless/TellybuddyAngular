import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PhoneNumber } from 'src/app/classes/phone-number';
import { TransactionLineItem } from 'src/app/classes/transaction-line-item';
import { Transaction } from 'src/app/classes/transaction';

import { PhoneNumberService } from 'src/app/service/phone-number.service';
import { PlanService } from 'src/app/service/plan.service';
import { Plan } from 'src/app/classes/plan';
import { Product } from 'src/app/classes/product';
import { LuxuryProduct } from 'src/app/classes/luxury-product';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SessionService } from 'src/app/service/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogRecommendPlansComponent } from '../dialog-recommend-plans/dialog-recommend-plans.component';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfigureNewPlanComponent } from '../dialog-configure-new-plan/dialog-configure-new-plan.component';

@Component({
    selector: 'app-promotions',
    templateUrl: './promotions.component.html',
    styleUrls: ['./promotions.component.css'],
})
export class PromotionsComponent implements OnInit {
    flashPlans: Plan[];
    flashNormal: Product[];
    flashLuxury: Product[];
    loaded: boolean = false;
    isMobile: boolean = false;
    isTablet: boolean = false;
    isLaptop: boolean = false;

    selectedNormalProduct: Product;
    selectedLuxuryProduct: Product;
    selectedPlan: Plan;

    constructor(
        public sessionService: SessionService,
        private snackBar: MatSnackBar,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private planService: PlanService,
        private productService: ProductService,
        private phoneNumberService: PhoneNumberService,
        private breakpointObserver: BreakpointObserver,
        public dialog: MatDialog
    ) {
        this.breakpointObserver
            .observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge,
            ])
            .subscribe((result) => {
                if (result.breakpoints[Breakpoints.XSmall]) {
                    this.isMobile = true;
                    this.isTablet = false;
                    this.isLaptop = false;
                }
                if (result.breakpoints[Breakpoints.Small]) {
                    this.isTablet = true;
                    this.isMobile = false;
                    this.isLaptop = false;
                }
                if (
                    result.breakpoints[Breakpoints.Medium] ||
                    result.breakpoints[Breakpoints.Large]
                ) {
                    this.isLaptop = true;
                    this.isMobile = false;
                    this.isTablet = false;
                }
                if (result.breakpoints[Breakpoints.XLarge]) {
                    this.isMobile = false;
                    this.isTablet = false;
                    this.isLaptop = false;
                }
            });
    }

    ngOnInit() {
        this.loaded = false;
        this.planService.retrieveAllActiveFlashPlans().subscribe(
            (response) => {
                this.flashPlans = response.plans;
                this.flashPlans.sort((a, b) => a.price - b.price);
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );

        this.loaded = false;
        this.productService.retrieveAllDiscountedNormalProducts().subscribe(
            (response) => {
                this.flashNormal = response.products;
                this.flashNormal.sort((a, b) => a.price - b.price);
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );

        this.loaded = false;
        this.productService.retrieveAllDiscountedLuxuryProducts().subscribe(
            (response) => {
                this.flashLuxury = response.products;
                this.flashLuxury.sort((a, b) => a.price - b.price);
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    openDialogPlan(index: number): void {
        this.selectedPlan = this.flashPlans[index];

        this.dialog.open(DialogConfigureNewPlanComponent, {
            data: {
                selectedPlan: this.flashPlans[index],
            },
        });
    }

    addLuxuryProductToCart(index: number): void {
        this.selectedLuxuryProduct = this.flashLuxury[index];

        //type cast
        let typeCastLP: LuxuryProduct;
        typeCastLP = this.selectedLuxuryProduct as LuxuryProduct;
        // if (this.selectedLuxury instanceof LuxuryProduct) {
        //   selectedLuxuryProd = this.selectedLuxury as LuxuryProduct;
        // }

        let newLineItem: TransactionLineItem = {
            product: undefined,
            transactionLineItemId: undefined,
            price: this.selectedLuxuryProduct.discountPrice,
            quantity: 1,
            subtotal: this.selectedLuxuryProduct.discountPrice,
            transaction: undefined,
            subscription: undefined,
            productItem: {
                productItemId: undefined,
                serialNumber: undefined,
                price: this.selectedLuxuryProduct.discountPrice,
                luxuryProduct: {
                    serialNumber: typeCastLP.serialNumber,
                    productItems: undefined,
                    productId: this.selectedLuxuryProduct.productId,
                    skuCode: this.selectedLuxuryProduct.skuCode,
                    name: this.selectedLuxuryProduct.name,
                    description: this.selectedLuxuryProduct.description,
                    price: this.selectedLuxuryProduct.price,
                    quantityOnHand: this.selectedLuxuryProduct.quantityOnHand,
                    reorderQuantity: this.selectedLuxuryProduct.reorderQuantity,
                    productImagePath: this.selectedLuxuryProduct.productImagePath,
                    tags: this.selectedLuxuryProduct.tags,
                    category: this.selectedLuxuryProduct.category,
                    dealStartTime: this.selectedLuxuryProduct.dealStartTime,
                    dealEndTime: this.selectedLuxuryProduct.dealEndTime,
                    discountPrice: this.selectedLuxuryProduct.discountPrice,
                },
            },
        };

        this.sessionService.addToCart(newLineItem);

            const snackBarRef = this.snackBar.open(
                'Successfully added Product: "' +
                    this.selectedLuxuryProduct.name +
                    '" to the cart!',
                'Undo',
                {
                    duration: 4500,
                }
            );

            snackBarRef.onAction().subscribe(() => {
                this.sessionService.undoAddToCart();
            });
    }

    addNormalProductToCart(index: number): void {
        this.selectedNormalProduct = this.flashNormal[index];
        let added: boolean = false;

        //check if normal product is already a lineItem in cart
        let currentTransaction: Transaction = this.sessionService.getCart();
        let currentLineItems: TransactionLineItem[] =
            currentTransaction.transactionLineItems;
        for (let index = 0; index < currentLineItems.length; index++) {
            let li: TransactionLineItem = currentLineItems[index];
            if (
                li.productItem == undefined &&
                li.product.productId == this.selectedNormalProduct.productId &&
                li.price == this.selectedNormalProduct.discountPrice
            ) {
                currentLineItems[index].quantity =
                    currentLineItems[index].quantity + 1;
                currentLineItems[index].subtotal =
                    currentLineItems[index].quantity *
                    currentLineItems[index].price;
                added = true;
            }
        }
        currentTransaction.transactionLineItems = currentLineItems;
        this.sessionService.setCart(currentTransaction);

        const snackBarRef = this.snackBar.open(
            'Successfully increased quantity of Product: "' +
                this.selectedNormalProduct.name +
                '" by 1 to the cart! Quantity can be adjusted in the cart!',
            'Undo',
            {
                duration: 4500,
            }
        );

        snackBarRef.onAction().subscribe(() => {
            this.sessionService.updateLineItemQuantity(
                index,
                currentLineItems[index].quantity - 1
            );
        });

        if (added == false) {
          //create a new line item with discountPrice set as price
            let newLineItem: TransactionLineItem = {
                product: {
                    productId: this.selectedNormalProduct.productId,
                    skuCode: this.selectedNormalProduct.skuCode,
                    name: this.selectedNormalProduct.name,
                    description: this.selectedNormalProduct.description,
                    price: this.selectedNormalProduct.price,
                    quantityOnHand: this.selectedNormalProduct.quantityOnHand,
                    reorderQuantity: this.selectedNormalProduct.reorderQuantity,
                    productImagePath: this.selectedNormalProduct.productImagePath,
                    tags: this.selectedNormalProduct.tags,
                    category: this.selectedNormalProduct.category,
                    dealStartTime: this.selectedNormalProduct.dealStartTime,
                    dealEndTime: this.selectedNormalProduct.dealEndTime,
                    discountPrice: this.selectedNormalProduct.discountPrice,
                },
                transactionLineItemId: undefined,
                price: this.selectedNormalProduct.discountPrice,
                quantity: 1,
                subtotal: this.selectedNormalProduct.discountPrice,
                transaction: undefined,
                subscription: undefined,
                productItem: undefined,
            };

            this.sessionService.addToCart(newLineItem);

            const snackBarRef = this.snackBar.open(
                'Successfully added Product: "' +
                    this.selectedNormalProduct.name +
                    '" to the cart! Quantity of product can be adjusted in the cart!',
                'Undo',
                {
                    duration: 4500,
                }
            );

            snackBarRef.onAction().subscribe(() => {
                this.sessionService.undoAddToCart();
            });
        }
    }
}
