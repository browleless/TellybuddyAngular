import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SubscriptionService } from 'src/app/service/subscription.service';
import { Subscription } from 'src/app/classes/subscription';
import { Plan } from 'src/app/classes/plan';
import * as Chart from 'chart.js'
import { DialogAmendSubscriptionUnits } from '../dialog-amend-subscription-units/dialog-amend-subscription-units.component';
import { DialogAddonSubscriptionUnits } from '../dialog-addon-subscription-units/dialog-addon-subscription-units.component';

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
    addon: boolean = false;
    selectedSubscriptionPlan: Plan;
    currentDate: Date;
    monthAgo: Date;
    dataUsage: number = 0;
    smsUsage: number = 0
    talktimeUsage: number = 0;
    remainingData: number;
    remainingSms: number;
    remainingTalktime: number;

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
                    var sub = this.subscriptions[i];
                    if (sub.subscriptionStartDate != null) {
                        sub.subscriptionStartDate = new Date(sub.subscriptionStartDate.toString().substring(0, 19));
                    }
                    if (sub.subscriptionEndDate != null) {
                        sub.subscriptionEndDate = new Date(sub.subscriptionEndDate.toString().substring(0, 19));
                    }
                }
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );

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
                    data: [this.dataUnits, this.smsUnits, this.talktimeUnits],
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
        this.remainingData = this.dataUnits * this.selectedSubscriptionPlan.dataConversionRate / 1000 - this.dataUsage;
        this.remainingSms = this.smsUnits * this.selectedSubscriptionPlan.smsConversionRate - this.smsUsage;
        this.remainingTalktime = this.talktimeUnits * this.selectedSubscriptionPlan.talktimeConversionRate - this.talktimeUsage;

        this.dataCanvas = document.getElementById(('dataChart' + i).toString());
        this.dataCtx = this.dataCanvas.getContext('2d');
        let dataDonutChart = new Chart(this.dataCtx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [this.remainingData > 0 ? this.dataUsage : 0, this.remainingData > 0 ? this.remainingData : 0, this.remainingData < 0 ? this.remainingData : 0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(228, 233, 237, 1)',
                        'rgba(249, 71, 6, 1)',

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
                    data: [this.remainingSms > 0 ? this.smsUsage : 0, this.remainingSms > 0 ? this.remainingSms : 0, this.remainingSms < 0 ? this.remainingSms : 0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(228, 233, 237, 1)',
                        'rgba(249, 71, 6, 1)',

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
                    data: [this.remainingTalktime > 0 ? this.talktimeUsage : 0, this.remainingTalktime > 0 ? this.remainingTalktime : 0, this.remainingTalktime < 0 ? this.remainingTalktime : 0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(228, 233, 237, 1)',
                        'rgba(249, 71, 6, 1)',

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
                this.selectedSubscriptionPlan = this.selectedSubscription.plan;
        
                this.dataUnits = this.subscriptions[i].dataUnits['allocated'] + this.subscriptions[i].dataUnits['familyGroup'] + this.subscriptions[i].dataUnits['addOn'] - this.subscriptions[i].dataUnits['donated'];
                this.smsUnits = this.subscriptions[i].smsUnits['allocated'] + this.subscriptions[i].dataUnits['familyGroup'] + this.subscriptions[i].dataUnits['addOn'] - this.subscriptions[i].dataUnits['donated'];
                this.talktimeUnits = this.subscriptions[i].talkTimeUnits["allocated"] + this.subscriptions[i].dataUnits['familyGroup'] + this.subscriptions[i].dataUnits['addOn'] - this.subscriptions[i].dataUnits['donated'];
                this.totalUnits = this.subscriptions[i].plan.totalBasicUnits;
                // function roundN(num,n){
                //     return parseFloat(Math.round(num * Math.pow(10, n) /Math.pow(10,n)).toFixed(n));
                //   }
                if(this.selectedSubscription.subscriptionStatusEnum == "ACTIVE"){

                    this.dataUsage = this.selectedSubscription.usageDetails[this.selectedSubscription.usageDetails.length-1].dataUsage;
                    this.smsUsage = this.selectedSubscription.usageDetails[this.selectedSubscription.usageDetails.length-1].smsUsage;
                    this.talktimeUsage = this.selectedSubscription.usageDetails[this.selectedSubscription.usageDetails.length-1].talktimeUsage;
                }
                if(this.selectedSubscription.subscriptionStartDate != null){

                    this.currentDate = new Date();
                    this.monthAgo = new Date(this.currentDate);
                    var date = new Date(this.selectedSubscription.subscriptionStartDate);
                    if (this.currentDate.getDate() < date.getDate()) {
            
                        this.monthAgo.setMonth(this.monthAgo.getMonth() - 1);
                    }
                }
                this.loadCharts(i);
            },
            (error) => {
                console.log(error);
            }
        );


        var itemsExceeded = "";
        if (this.remainingData < 0) {
            itemsExceeded += " Data"
        } 
        if (this.remainingSms < 0) {
            itemsExceeded += " Sms"
        } 
        if (this.remainingTalktime < 0) {
            itemsExceeded += " TalkTime"
        }

        if (itemsExceeded.length != 0) {
            let snackBarRef = this.snackBar.open(
                'You\'ve exceeded your monthly allowance for' + itemsExceeded + '. Purchase a top-up now to avoid penalty charges! ',
                'Close',
                {
                    duration: 10000,
                    panelClass: 'text-align:center'
                }
            );
        }

        this.isOpened = true;
    }

    resetState() :void{
        this.dataUsage = 0;
        this.smsUsage = 0;
        this.talktimeUsage = 0;
        this.dataUnits = 0;
        this.smsUnits = 0;
        this.talktimeUnits = 0;
    }
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

    subscribeAddon(i: number): void {
        this.addon = !this.addon;

        const dialogRef = this.dialog.open(DialogAddonSubscriptionUnits, {
            data: {
                selectedSubscription: this.subscriptions[i],
            },
        });

        dialogRef.afterClosed().subscribe(
            (response) => {
                this.addon = false;
            }
        );

    }

    requestToTerminateSubscription(i: number): void {
        if (this.subscriptions[i].subscriptionStatusEnum != "ACTIVE") {
            this.snackBar.open(
                'Permission Denied! Please ensure that the subscription is currently active',
                '',
                {
                    duration: 1500,
                }
            );
        } else {

            this.subscriptionService.terminateSubscription(this.selectedSubscription).subscribe(
                (response) => {
                    console.log("Request has been put in to terminate the subscription");
                    this.snackBar.open(
                        'We\'re sad to see you go! The subscription will be terminated at the end of this billing cycle!',
                        'Close',
                        {
                            duration: 4500,
                        }
                    );
                },
                (error) => {
                    console.log(error);
                }
            );

        }
    }
}