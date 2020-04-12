import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { SessionService } from 'src/app/service/session.service';
import { PlanService } from 'src/app/service/plan.service';

import { Plan } from 'src/app/classes/plan';
import { TransactionLineItem } from 'src/app/classes/transaction-line-item';

@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.css'],
})
export class PlansComponent implements OnInit {
    plans: Plan[];
    loaded: boolean = false;
    isMobile: boolean = false;
    isTablet: boolean = false;
    isLaptop: boolean = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService,
        private planService: PlanService,
        private snackBar: MatSnackBar,
        private breakpointObserver: BreakpointObserver
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
        this.planService.retrieveAllPlans().subscribe(
            (response) => {
                this.plans = response.plans;
                this.plans.sort((a, b) => a.price - b.price);
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    addPlanToCart(index: number): void {
        const selectedPlan = this.plans[index];

        let newLineItem: TransactionLineItem = {
            subscription: {
                subscriptionId: undefined,
                dataUnits: undefined,
                talkTimeUnits: undefined,
                smsUnits: undefined,
                subscriptionStatusEnum: undefined,
                subscriptionStartDate: undefined,
                subscriptionEndDate: undefined,
                customer: undefined,
                isActive: undefined,
                usageDetails: undefined,
                phoneNumber: undefined,
                plan: selectedPlan,
            },
            transactionLineItemId: undefined,
            transaction: this.sessionService.getCart(),
            productItem: undefined,
            product: undefined,
            price: selectedPlan.price,
            quantity: 1,
            subtotal: selectedPlan.price,
        };

        this.sessionService.addToCart(newLineItem);

        const snackBarRef = this.snackBar.open(
            'Successfully added "' +
                selectedPlan.name +
                '" SIM plan to the cart!',
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
