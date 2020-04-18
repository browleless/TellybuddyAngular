import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TransactionService } from 'src/app/service/transaction.service';
import { Subscription } from 'src/app/classes/subscription';
import { Transaction } from 'src/app/classes/transaction';
import * as Chart from 'chart.js'

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
    transactions : Transaction[]
    loaded: boolean;
    displayedColumns: string[] = [
        'item',
        'date',
        'status',
        'price',
        // 'action',
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
        this.transactionService.retrieveAllCustomerTransactions().subscribe(
            (response) => {
                this.transactions = response.transactions;
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );

    }


}