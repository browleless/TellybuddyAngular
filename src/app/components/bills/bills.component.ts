import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar, MatDialog } from '@angular/material';

import { Subscription } from 'src/app/classes/subscription';
import { Bill } from 'src/app/classes/bill';

import { SubscriptionService } from 'src/app/service/subscription.service';
import { SessionService } from 'src/app/service/session.service';
import { BillService } from 'src/app/service/bill.service';

import { forkJoin } from 'rxjs';
import * as Chart from 'chart.js';
import { DialogBillPaymentComponent } from '../dialog-bill-payment/dialog-bill-payment.component';

@Component({
    selector: 'app-bills',
    templateUrl: './bills.component.html',
    styleUrls: ['./bills.component.css'],
})
export class BillsComponent implements OnInit {
    loaded: boolean = false;
    loadedBills: boolean = false;
    isMobile: boolean = false;
    isTablet: boolean = false;
    isLaptop: boolean = false;

    subscriptions: Subscription[];
    subscriptionBills: Bill[];
    outstandingBills: Bill[];

    observables = [];

    usageCanvas: any;
    usageCtx: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private breakpointObserver: BreakpointObserver,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        public sessionService: SessionService,
        private subscriptionService: SubscriptionService,
        private billService: BillService
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
        this.subscriptionService.retrieveAllCustomerSubscriptions().subscribe(
            (response) => {
                this.subscriptions = response.subscriptions;
                if (this.subscriptions.length) {
                    this.subscriptions.forEach((subscription) => {
                        this.observables.push(
                            this.billService.retrieveSubscriptionOutstandingBills(
                                subscription
                            )
                        );
                    });
                    forkJoin(this.observables).subscribe((result) => {
                        for (let i = 0; i < result.length; i++) {
                            this.subscriptions[i]['outstandingBills'] =
                                result[i].bills;
                        }
                        this.loaded = true;
                    });
                } else {
                    this.loaded = true;
                }
            },
            (error) => {
                console.log(error);
            }
        );

        this.billService
            .retrieveCustomerOutstandingBills(
                this.sessionService.getCurrentCustomer()
            )
            .subscribe(
                (response) => {
                    this.outstandingBills = response.bills;
                    this.outstandingBills.forEach(async (bill, index) => {
                        await new Promise((r) => setTimeout(r, 750));
                        this.usageCanvas = document.getElementById(
                            ('usageChart' + index).toString()
                        );
                        this.usageCtx = this.usageCanvas.getContext('2d');
                        new Chart(this.usageCtx, {
                            type: 'doughnut',
                            data: {
                                datasets: [
                                    {
                                        data: [
                                            bill.usageDetail.dataUsage %
                                                bill.usageDetail
                                                    .allowedDataUsage,
                                            bill.usageDetail.allowedDataUsage -
                                                (bill.usageDetail.dataUsage %
                                                    bill.usageDetail
                                                        .allowedDataUsage),
                                        ],
                                        backgroundColor: [
                                            bill.usageDetail.allowedDataUsage /
                                                bill.usageDetail.dataUsage >
                                            1
                                                ? '#3C4CAD'
                                                : '#D50000',
                                            'rgba(228, 233, 237, 1)',
                                        ],
                                    },
                                    {
                                        data: [
                                            bill.usageDetail.smsUsage %
                                                bill.usageDetail
                                                    .allowedSmsUsage,
                                            bill.usageDetail.allowedSmsUsage -
                                                (bill.usageDetail.smsUsage %
                                                    bill.usageDetail
                                                        .allowedSmsUsage),
                                        ],
                                        backgroundColor: [
                                            bill.usageDetail.allowedSmsUsage /
                                                bill.usageDetail.smsUsage >
                                            1
                                                ? '#F9C449'
                                                : '#D50000',
                                            'rgba(228, 233, 237, 1)',
                                        ],
                                    },
                                    {
                                        data: [
                                            bill.usageDetail.talktimeUsage %
                                                bill.usageDetail
                                                    .allowedTalktimeUsage,
                                            bill.usageDetail
                                                .allowedTalktimeUsage -
                                                (bill.usageDetail
                                                    .talktimeUsage %
                                                    bill.usageDetail
                                                        .allowedTalktimeUsage),
                                        ],
                                        backgroundColor: [
                                            bill.usageDetail
                                                .allowedTalktimeUsage /
                                                bill.usageDetail.talktimeUsage >
                                            1
                                                ? '#F04393'
                                                : '#D50000',
                                            'rgba(228, 233, 237, 1)',
                                        ],
                                    },
                                ],
                            },
                            options: {
                                responsive: true,
                                display: true,
                            },
                        });
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    handleOpen(index: number) {
        this.loadedBills = false;
        this.billService
            .retrieveSubscriptionBills(this.subscriptions[index])
            .subscribe(
                (response) => {
                    this.subscriptionBills = response.bills;
                    this.loadedBills = true;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    openDialog(index: number): void {
        const dialogRef = this.dialog.open(DialogBillPaymentComponent, {
            data: {
                selectedBill: this.outstandingBills[index],
            },
        });

        dialogRef.afterClosed().subscribe((paid) => {
            if (paid) {
                this.loaded = false;
                this.subscriptions = new Array();
                this.subscriptionBills = new Array();
                this.outstandingBills = new Array();
                this.observables = new Array();

                this.ngOnInit();
            }
        });
    }
}
