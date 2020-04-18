import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SubscriptionService } from 'src/app/service/subscription.service';
import { Subscription } from 'src/app/classes/subscription';
import { Plan } from 'src/app/classes/plan';
import * as Chart from 'chart.js'
import { ViewChild } from '@angular/core';
import { DialogAmendSubscriptionUnits } from '../dialog-amend-subscription-units/dialog-amend-subscription-units.component';

declare var require: any;

@Component({
    selector: 'app-subscriptions',
    templateUrl: './subscriptions.component.html',
    styleUrls: ['./subscriptions.component.css'],
})
export class SubscriptionsComponent implements OnInit {

    subscriptions: Subscription[];
    selectedSubscription: Subscription;
    loaded: boolean;
    isOpened: boolean;
    dataUnits: number;
    smsUnits: number;
    talktimeUnits: number;
    totalUnits: number;
    editMode: boolean = false;
    selectedSubscriptionPlan: Plan;
    currentDate: Date;
    monthAgo: Date;
    dataUsage: number = 6.89;
    smsUsage: number = 333;
    talktimeUsage: number = 421;


    canvas: any;
    ctx: any;
    dataCanvas: any;
    dataCtx: any;
    smsCanvas: any;
    smsCtx: any;
    talkTimeCanvas: any;
    talkTimeCtx: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private subscriptionService: SubscriptionService,
        private breakpointObserver: BreakpointObserver,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {

    }

    ngOnInit() {
        this.subscriptionService.retrieveAllCustomerSubscriptions().subscribe(
            (response) => {
                function compare(a, b) {
                    const values = ["PENDING", "ACTIVE", "TERMINATING", "DISABLED"]
                    if (values.indexOf(a.subscriptionStatusEnum) <= values.indexOf(b.subscriptionStatusEnum)) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
                this.subscriptions = response.subscriptions.sort(compare);

                for (var i = 0; i < this.subscriptions.length; i++) {
                    this.subscriptions[i].subscriptionStartDate = this.subscriptions[i].subscriptionStartDate.substring(0, 19);
                }
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );
        this.currentDate = new Date();
        this.monthAgo = new Date(this.currentDate);
        this.monthAgo.setMonth(this.monthAgo.getMonth() - 1);
    }


    loadCharts(i) {
        this.canvas = document.getElementById(('myChart' + i).toString());
        this.ctx = this.canvas.getContext('2d');
        let myChart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: ["Data", "SMS", "Talk Time"],
                datasets: [{
                    label: 'Current Allocation of Units',
                    data: [this.subscriptions[i].dataUnits['allocated'], this.subscriptions[i].smsUnits['allocated'], this.subscriptions[i].talkTimeUnits['allocated']],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                display: true,
                scales: {
                    xAxes: [{
                        display: true,

                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            stepSize: 1,
                        }
                    }],
                }
            }
        });

        this.dataCanvas = document.getElementById(('dataChart' + i).toString());
        this.dataCtx = this.dataCanvas.getContext('2d');
        let dataDonutChart = new Chart(this.dataCtx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [this.dataUsage, this.dataUnits*this.selectedSubscriptionPlan.dataConversionRate/1000 - this.dataUsage],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(228, 233, 237, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                display: true,
                cutoutPercentage: 80,
            }
        });
        this.smsCanvas = document.getElementById(('smsChart' + i).toString());
        this.smsCtx = this.smsCanvas.getContext('2d');
        let smsDonutChart = new Chart(this.smsCtx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [this.smsUsage, this.smsUnits*this.selectedSubscriptionPlan.smsConversionRate - this.smsUsage],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(228, 233, 237, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                display: true,
                cutoutPercentage: 80,
            }
        });
        this.talkTimeCanvas = document.getElementById(('talkTimeChart' + i).toString());
        this.talkTimeCtx = this.talkTimeCanvas.getContext('2d');
        let talkTimeDonutChart = new Chart(this.talkTimeCtx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [this.talktimeUsage, this.talktimeUnits*this.selectedSubscriptionPlan.talktimeConversionRate - this.talktimeUsage],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(228, 233, 237, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                display: true,
                cutoutPercentage: 80,
            }
        });

    }
    openGroup(i: number) {
        this.subscriptionService.retrieveSubscriptionById(this.subscriptions[i]).subscribe(
            (response) => {
                this.selectedSubscription = response.subscription;
            },
            (error) => {
                console.log(error);
            }
        );
        this.selectedSubscriptionPlan = this.subscriptions[i].plan;
        this.dataUnits = this.subscriptions[i].dataUnits['allocated'];
        this.smsUnits = this.subscriptions[i].smsUnits['allocated'];
        this.talktimeUnits = this.subscriptions[i].talkTimeUnits["allocated"];
        this.totalUnits = this.subscriptions[i].plan.totalBasicUnits;

        this.loadCharts(i);

        this.isOpened = true;
    }

    // refresh() :void{
    //     this.dataSlider.value = this.dataUnits;
    //     this.smsSlider.value = this.smsUnits;
    //     this.talktimeSlider.value = this.talktimeUnits;
    //     console.log(this.talktimeSlider.value);
    // }
    // resetState() :void{
    //     this.dataSlider.value =0;
    //     this.smsSlider.value = 0;
    //     this.talktimeSlider.value = 0;
    //     this.editMode = false;
    // }
    toggleEdit(i: number): void {
        this.editMode = !this.editMode;

        const dialogRef = this.dialog.open(DialogAmendSubscriptionUnits, {
            data: {
                selectedSubscription: this.subscriptions[i],
            },
        });

        dialogRef.afterClosed().subscribe(
            (response) => {
                this.editMode = false;
            }
        );

    }
    allocateUnitsForNextMonth(): void {
        this.subscriptionService.amendSubscriptionUnits(this.selectedSubscription, this.dataUnits, this.smsUnits, this.talktimeUnits).subscribe(
            (response) => {
                console.log("Subscription Id: " + response.subscriptionId + " has been edited");
            },
            (error) => {
                console.log(error);
            }
        );
        this.snackBar.open(
            'Successfully amended allocation of units! Changes will be reflected from next month!',
            'Undo',
            {
                duration: 4500,
            }
        );
    }

    requestToTerminateSubscription(i:number): void{
        if(this.subscriptions[i].subscriptionStatusEnum != "ACTIVE"){
            this.snackBar.open(
                'Permission Denied! Please ensure that the subscription is currently active',
                '',
                {
                    duration: 1500,
                }
            );
        } else{

            this.subscriptionService.terminateSubscription(this.selectedSubscription).subscribe(
                (response) => {
                    console.log("Request has been put in to terminate the subscription");
                },
                (error) => {
                    console.log(error);
                }
            );
            this.snackBar.open(
                'We\'re sad to see you go! The subscription will be terminated at the end of this billing cycle!',
                'U',
                {
                    duration: 4500,
                }
            );
        }
    }
}