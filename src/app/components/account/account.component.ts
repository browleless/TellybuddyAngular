import {
    Component,
    OnInit,
    ViewChild,
    ViewChildren,
    QueryList,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    MatTabChangeEvent,
    MatTableDataSource,
    MatPaginator,
} from '@angular/material';

import { SessionService } from 'src/app/service/session.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { Subscription } from 'src/app/classes/subscription';
import { Transaction } from 'src/app/classes/transaction';
import { Customer } from 'src/app/classes/customer';
import * as Chart from 'chart.js';
import { Announcement } from 'src/app/classes/announcement';
import { DialogViewAnnouncementDetailsComponent } from '../dialog-view-announcement-details/dialog-view-announcement-details.component';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
    @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

    allTransactions: Transaction[];
    transactions = new MatTableDataSource([]);
    sortedTransactions = {
        All: [],
        Processing: [],
        Shipped: [],
        Delivered: [],
        Refunded: [],
    };
    loaded: boolean;
    tabs: string[] = ['All', 'Processing', 'Shipped', 'Delivered', 'Refunded'];
    displayedColumns: string[] = ['item', 'date', 'status', 'price', 'action'];
    currentCustomer: Customer;

    announcements = new MatTableDataSource([]);
    announcementDisplayedColumns: string[] = [
        'item',
        'title',
        'date',
        'action',
    ];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private transactionService: TransactionService,
        public sessionService: SessionService,
        private breakpointObserver: BreakpointObserver,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private announcementService: AnnouncementService,
        private customerService: CustomerService
    ) {}

    ngOnInit() {
        //this.currentCustomer = this.sessionService.getCurrentCustomer();

        this.customerService.retrieveCurrentCustomer().subscribe((response) => {
            this.sessionService.setCurrentCustomer(response.customer);
            this.currentCustomer = this.sessionService.getCurrentCustomer();
        });
        this.announcementService.retrieveAllAnnouncements().subscribe(
            (response) => {
                response.announcements.forEach((announcement) => {
                    announcement.postedDate = new Date(
                        Date.parse(
                            announcement.postedDate.toString().substring(0, 19)
                        ) +
                            8 * 60 * 60 * 1000
                    );
                    announcement.expiryDate = new Date(
                        Date.parse(
                            announcement.expiryDate.toString().substring(0, 19)
                        ) +
                            8 * 60 * 60 * 1000
                    );
                });
                response.announcements.sort((a, b) => {
                    return b.postedDate.getTime() - a.postedDate.getTime();
                });
                this.announcements = new MatTableDataSource(
                    response.announcements
                );
            },
            (error) => {
                console.log(error);
            }
        );
        this.transactionService.retrieveAllCustomerTransactions().subscribe(
            (response) => {
                this.allTransactions = response.transactions;
                var processed = [];
                var shipped = [];
                var delivered = [];
                var refunded = [];
                this.allTransactions.forEach(function (item) {
                    item.transactionDateTime = new Date(
                        Date.parse(
                            item.transactionDateTime.toString().substring(0, 19)
                        ) +
                            8 * 60 * 60 * 1000
                    );
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
                this.sortedTransactions['All'] = this.allTransactions;
                this.sortedTransactions['Processing'] = processed;
                this.sortedTransactions['Shipped'] = shipped;
                this.sortedTransactions['Delivered'] = delivered;
                this.sortedTransactions['Refunded'] = refunded;
                this.transactions = new MatTableDataSource(
                    this.allTransactions.sort(
                        (a: Transaction, b: Transaction) => {
                            return (
                                b.transactionDateTime.getTime() -
                                a.transactionDateTime.getTime()
                            );
                        }
                    )
                );
                setTimeout(
                    () =>
                        (this.announcements.paginator = this.paginator.toArray()[0])
                );
                setTimeout(
                    () =>
                        (this.transactions.paginator = this.paginator.toArray()[1])
                );
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }
    updateParticulars() {
        this.router.navigate(['account/account-edit']);
    }
    manageTransaction(transactionId: number) {
        this.router.navigate(['transaction-view/' + transactionId]);
    }
    filterTransactions(tabChangeEvent: MatTabChangeEvent) {
        this.transactions = new MatTableDataSource(
            this.sortedTransactions[this.tabs[tabChangeEvent.index]]
        );
        this.transactions.paginator = this.paginator.toArray()[
            1 + tabChangeEvent.index
        ];
    }

    openDialog(index: number) {
        const selectedAnnouncement = this.announcements.filteredData[index];

        const dialogRef = this.dialog.open(
            DialogViewAnnouncementDetailsComponent,
            {
                data: {
                    selectedAnnouncement: selectedAnnouncement,
                },
            }
        );

        dialogRef.afterClosed().subscribe((response) => {
            let unreadAnnouncements = this.sessionService.getAnnouncements();

            const indexToRemove =
                unreadAnnouncements
                    .map((announcement) => announcement.announcementId)
                    .indexOf(selectedAnnouncement.announcementId) +
                this.paginator.toArray()[0].pageIndex *
                    this.paginator.toArray()[0].pageSize;

            if (indexToRemove !== -1) {
                unreadAnnouncements.splice(indexToRemove, 1);
                this.sessionService.setAnnouncements(unreadAnnouncements);
            }
        });
    }
}
