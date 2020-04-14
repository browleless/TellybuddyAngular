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

    openDialog(index: number): void {
        this.dialog.open(DialogConfigureNewPlanComponent, {
            data: {
                selectedPlan: this.plans[index],
            },
        });
    }
}
