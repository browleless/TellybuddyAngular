import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material';

import { SessionService } from 'src/app/service/session.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { Subscription } from 'src/app/classes/subscription';
import { Transaction } from 'src/app/classes/transaction';
import { Customer } from 'src/app/classes/customer';
import * as Chart from 'chart.js';

@Component({
    selector: 'app-transactions',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
    allTransactions: Transaction[];
    transactions: Transaction[];
    sortedTransactions = {
        "All" : [],
       "Processing": [],
       "Shipped": [],
       "Delivered": [],
       "Refunded": [],
    };
    loaded: boolean;
    tabs: string[] = ['All', 'Processing', 'Shipped', 'Delivered', 'Refunded'];
    displayedColumns: string[] = ['item', 'date', 'status', 'price', 'action'];
    currentCustomer: Customer;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private transactionService: TransactionService,
        private sessionService: SessionService,
        private breakpointObserver: BreakpointObserver,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.currentCustomer = this.sessionService.getCurrentCustomer();
        this.transactionService.retrieveAllCustomerTransactions().subscribe(
            (response) => {
                this.allTransactions = response.transactions;
                var processed = [];
                var shipped = [];
                var delivered = [];
                var refunded = [];
                this.allTransactions.forEach(function(item) {
                    if (item.transactionStatusEnum == 'PROCESSING') {
                        processed.push(item);
                    } else if (item.transactionStatusEnum == 'SHIPPED') {
                        shipped.push(item);
                    } else if (item.transactionStatusEnum == 'REFUNDED') {
                        refunded.push(item);
                    } else {
                        delivered.push(item);
                    }
                });
                this.sortedTransactions['All']= (this.allTransactions);
                this.sortedTransactions['Processing']= (processed);
                this.sortedTransactions['Shipped'] = (shipped);
                this.sortedTransactions['Delivered']= (delivered);
                this.sortedTransactions['Refunded'] = (refunded);

                function getTime(date?: string) {
                    return date != null ? new Date(date).getTime() : 0;
                }
                this.transactions = this.allTransactions.sort(
                    (a: Transaction, b: Transaction) => {
                        return (
                            getTime(
                                b.transactionDateTime
                                    .toString()
                                    .substring(0, 19)
                            ) -
                            getTime(
                                a.transactionDateTime
                                    .toString()
                                    .substring(0, 19)
                            )
                        );
                    }
                );
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );
        
    }
    manageTransaction(i: number) {
        this.router.navigate([
            'transaction-view/' + this.allTransactions[i].transactionId,
        ]);
    }
    filterTransactions(tabChangeEvent: MatTabChangeEvent) {
        this.transactions = this.sortedTransactions[this.tabs[tabChangeEvent.index]];
    }
}
