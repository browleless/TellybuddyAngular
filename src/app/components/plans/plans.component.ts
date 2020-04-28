import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DialogConfigureNewPlanComponent } from '../dialog-configure-new-plan/dialog-configure-new-plan.component';
import { MatDialog } from '@angular/material/dialog';

import { PlanService } from 'src/app/service/plan.service';

import { Plan } from 'src/app/classes/plan';

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
        private planService: PlanService,
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
    }

    openDialog(index: number): void {
        this.dialog.open(DialogConfigureNewPlanComponent, {
            data: {
                selectedPlan: this.plans[index],
            },
        });
    }
}
