import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';

import { TransactionService } from 'src/app/service/transaction.service';
import { Subscription } from 'src/app/classes/subscription';
import { Transaction } from 'src/app/classes/transaction';
import * as Chart from 'chart.js';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
    selector: 'app-transaction-view',
    templateUrl: './transaction-view.component.html',
    styleUrls: ['./transaction-view.component.css'],
})
export class ViewTransactionComponent implements OnInit {
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    transaction: Transaction;
    transactionId: number;
    loaded: boolean;
    transactionStatus: number;
    displayedColumns: string[] = ['item', 'price', 'quantity', 'subtotal'];
    lineItems = new MatTableDataSource([]);

    profilePicture: any;
    imageLoading: boolean = true;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private transactionService: TransactionService,
        private breakpointObserver: BreakpointObserver,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private customerService: CustomerService
    ) {}

    ngOnInit() {
        this.transactionId = parseInt(
            this.activatedRoute.snapshot.paramMap.get('transactionId')
        );

        this.getProfilePicture();

        this.transactionService
            .retrieveTransactionById(this.transactionId)
            .subscribe(
                (response) => {
                    this.transaction = response.transaction;
                    this.transaction.transactionDateTime = new Date(
                        Date.parse(
                            this.transaction.transactionDateTime
                                .toString()
                                .substring(0, 19)
                        ) +
                            8 * 60 * 60 * 1000
                    );
                    this.lineItems = new MatTableDataSource(
                        this.transaction.transactionLineItems
                    );
                    setTimeout(
                        () => (this.lineItems.paginator = this.paginator)
                    );
                    var status = [
                        'PROCESSING',
                        'SHIPPED',
                        'RECEIVED',
                        'REFUND_REQUESTED',
                        'REFUNDED',
                    ];
                    this.transactionStatus = status.indexOf(
                        this.transaction.transactionStatusEnum.toString()
                    );
                    this.loaded = true;
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    refundTransaction() {
        this.transactionService
            .refundTransaction(this.transaction.transactionId)
            .subscribe(
                (response) => {
                    this.snackBar.open(
                        'Your refund request has been submitted. Please allow us 7-10 days to process this request!',
                        'Close',
                        { duration: 4500 }
                    );
                    this.ngOnInit();
                },
                (error) => {
                    this.snackBar.open(error, 'Close', { duration: 4500 });
                }
            );
    }
    createImageFromBlob(image: Blob) {
        let reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
                this.profilePicture = reader.result;
            },
            false
        );

        if (image) {
            reader.readAsDataURL(image);
        }
    }
    getProfilePicture() {
        this.customerService.retrieveProfilePicture().subscribe(
            (data) => {
                this.createImageFromBlob(data);
                this.imageLoading = false;
            },
            (error) => {
                this.imageLoading = true;
                console.log(error);
            }
        );
    }
}
