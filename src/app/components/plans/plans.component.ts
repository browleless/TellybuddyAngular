import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SessionService } from 'src/app/service/session.service';
import { PlanService } from 'src/app/service/plan.service';

import { Plan } from 'src/app/classes/plan';

@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.css'],
})
export class PlansComponent implements OnInit {
    plans: Plan[];
    loaded: boolean;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService,
        private planService: PlanService,
        private snackBar: MatSnackBar
    ) {
        this.loaded = false;
    }

    ngOnInit() {
        this.planService.retrieveAllPlans().subscribe(
            (response) => {
                this.plans = response.plans;
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    addPlanToCart(index: number): void {
        this.snackBar.open(
            'Successfully added "' +
                this.plans[index].name +
                '" SIM plan to the cart!',
            'Close',
            {
                duration: 4500,
            }
        );
    }
}
