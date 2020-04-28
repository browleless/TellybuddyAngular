import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PhoneNumber } from 'src/app/classes/phone-number';
import { TransactionLineItem } from 'src/app/classes/transaction-line-item';

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
import { DialogConfigureContractPlanComponent } from '../dialog-configure-contract-plan/dialog-configure-contract-plan.component';

@Component({
    selector: 'app-bundle-plans',
    templateUrl: './bundle-plans.component.html',
    styleUrls: ['./bundle-plans.component.css'],
})
export class BundlePlansComponent implements OnInit {
    plans: Plan[];
    loaded: boolean = false;
    isMobile: boolean = false;
    isTablet: boolean = false;
    isLaptop: boolean = false;

    productId: number;
    selectedProduct: Product;
    selectedPlan: Plan;

    discountedMobilePrice: number;
    // no need alr
    newPlanLineItem: TransactionLineItem;
    newMobileLineItem: TransactionLineItem;

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
        this.productId = parseInt(
            this.activatedRoute.snapshot.paramMap.get('productId')
        );

        this.loaded = false;
        this.productService.retrieveProduct(this.productId).subscribe(
            (response) => {
                this.selectedProduct = response.product;
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );

        this.loaded = false;
        this.planService.retrieveAllNormalPlans().subscribe(
            (response) => {
                this.plans = response.plans;
                this.plans.sort((a, b) => a.price - b.price);
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );

        // this.discountedMobilePrice = this.computeDiscountedMobilePrice();
    }

    openDialog(index: number): void {
        this.dialog.open(DialogConfigureContractPlanComponent, {
            data: {
                selectedPlan: this.plans[index],
                selectedProduct: this.selectedProduct,
            },
        });
    }

    computeDiscountedMobilePrice(): number {
        return this.selectedProduct.price * 0.8;
    }
}
