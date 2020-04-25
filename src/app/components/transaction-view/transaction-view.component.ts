import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';

import { TransactionService } from 'src/app/service/transaction.service';
import { Subscription } from 'src/app/classes/subscription';
import { Transaction } from 'src/app/classes/transaction';
import * as Chart from 'chart.js'

@Component({
    selector: 'app-transaction-view',
    templateUrl: './transaction-view.component.html',
    styleUrls: ['./transaction-view.component.css'],
})
export class ViewTransactionComponent implements OnInit {
    transaction : Transaction;
    transactionId : number;
    loaded: boolean;
    transactionStatus: number;
    displayedColumns: string[] = [
        'item',
        'price',
        'quantity',
        'subtotal',
    ];
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private transactionService: TransactionService,
        private breakpointObserver: BreakpointObserver,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {

    }

    ngOnInit() {
        this.transactionId = parseInt(
            this.activatedRoute.snapshot.paramMap.get('transactionId')
        );

        this.transactionService.retrieveTransactionById(this.transactionId).subscribe(
            (response) => {
                this.transaction = response.transaction;
                var status = ['PROCESSING',
                    'SHIPPED',
                    'RECEIVED',
                    'REFUND_REQUESTED',
                    'REFUNDED',]
                this.transactionStatus = status.indexOf(this.transaction.transactionStatusEnum.toString());
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );

    }
    refundTransaction(){
        this.transactionService.refundTransaction(this.transaction.transactionId).subscribe(
            (response) => {
                this.snackBar.open(
                    "Your refund request has been submitted. Please allow us 7-10 days to process this request!", "Close",
                    {duration: 4500}
                )
                this.ngOnInit();
            },
            (error) => {
                this.snackBar.open(
                    error, "Close",
                    {duration: 4500}
                )
            }
        )
    }

}