import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';

import { SubscriptionService } from 'src/app/service/subscription.service';
import { Subscription } from 'src/app/classes/subscription';

@Component({
    selector: 'app-subscriptions',
    templateUrl: './subscriptions.component.html',
    styleUrls: ['./subscriptions.component.css'],
})
export class SubscriptionsComponent implements OnInit {
    subscriptions: Subscription[];
    loaded: boolean;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private subscriptionService: SubscriptionService,
        private breakpointObserver: BreakpointObserver,
        public dialog: MatDialog
    ) {

    }

    ngOnInit() {
        this.subscriptionService.retrieveAllCustomerSubscriptions().subscribe(
            (response) => {
                this.subscriptions = response.subscriptions;
                
                console.log(this.subscriptions[0].subscriptionStartDate); 
                this.subscriptions[0].subscriptionStartDate = this.subscriptions[0].subscriptionStartDate.substring(0,20);
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
