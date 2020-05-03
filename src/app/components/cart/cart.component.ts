import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { SessionService } from 'src/app/service/session.service';

import { Transaction } from 'src/app/classes/transaction';
import { TransactionLineItem } from 'src/app/classes/transaction-line-item';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
    displayedColumns: string[] = [
        'item',
        'price',
        'quantity',
        'subtotal',
        'action',
    ];

    transaction: Transaction;
    loaded: boolean = false;
    isMobile: boolean = false;
    isTablet: boolean = false;
    isLaptop: boolean = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService,
        private snackBar: MatSnackBar,
        private breakpointObserver: BreakpointObserver
    ) {
        breakpointObserver
            .observe(['(max-width: 599px)'])
            .subscribe((result) => {
                this.isMobile = result.matches;
            });
        breakpointObserver
            .observe(['(max-width: 1279px)'])
            .subscribe((result) => {
                this.isTablet = result.matches;
                this.isMobile = false;
            });
        breakpointObserver
            .observe(['(max-width: 1919px)'])
            .subscribe((result) => {
                this.isLaptop = result.matches;
                this.isMobile = false;
                this.isTablet = false;
            });
    }

    ngOnInit() {
        this.transaction = this.sessionService.getCart();
        this.loaded = true;
    }

    incrementLineItemQuantity(lineItemIndex: number): void {
        this.sessionService.updateLineItemQuantity(
            lineItemIndex,
            ++this.transaction.transactionLineItems[lineItemIndex].quantity <=
                this.transaction.transactionLineItems[lineItemIndex].product
                    .quantityOnHand
                ? this.transaction.transactionLineItems[lineItemIndex].quantity
                : this.transaction.transactionLineItems[lineItemIndex].product
                      .quantityOnHand
        );
        this.transaction = this.sessionService.getCart();
    }

    decrementLineItemQuantity(lineItemIndex: number): void {
        this.sessionService.updateLineItemQuantity(
            lineItemIndex,
            --this.transaction.transactionLineItems[lineItemIndex].quantity
                ? this.transaction.transactionLineItems[lineItemIndex].quantity
                : 1
        );
        this.transaction = this.sessionService.getCart();
    }

    updateLineItemQuantity(lineItemIndex: number): void {
        this.sessionService.updateLineItemQuantity(
            lineItemIndex,
            this.transaction.transactionLineItems[lineItemIndex].quantity
                ? this.transaction.transactionLineItems[lineItemIndex].quantity
                : 1
        );
        this.transaction = this.sessionService.getCart();
    }

    deleteLineItem(lineItemIndex: number): void {
        //check if the lineItem is a bundle
        // remove 2 line items if it belongs to a bundle
        let deletedSuccessfully: boolean = false;

        let lineItems: TransactionLineItem[] = this.sessionService.getCart()
            .transactionLineItems;

        let lineItemToDelete: TransactionLineItem = lineItems[lineItemIndex];
        // console.log(lineItemIndex);
        // console.log(lineItemToDelete.subscription.isContract);
        if (
            lineItemToDelete.subscription != undefined &&
            lineItemToDelete.subscription.isContract
        ) {
            if (lineItemToDelete.price == lineItemToDelete.productItem.price) {
                this.sessionService.removeBundleFromCart(
                    lineItemIndex,
                    lineItemIndex + 1
                );
                this.transaction = this.sessionService.getCart();
                const snackBarRef = this.snackBar.open(
                    'Bundle (Mobile + Contract Plan1 removed from cart successfully!',
                    'Undo',
                    {
                        duration: 4500,
                    }
                );
                snackBarRef.onAction().subscribe(() => {
                    this.sessionService.undoRemoveBundleFromCart();
                    this.transaction = this.sessionService.getCart();
                });
            } else {
                this.sessionService.removeBundleFromCart(
                    lineItemIndex - 1,
                    lineItemIndex
                );
                this.transaction = this.sessionService.getCart();
                const snackBarRef = this.snackBar.open(
                    'Bundle (Mobile + Contract Plan) removed from cart successfully!',
                    'Undo',
                    {
                        duration: 4500,
                    }
                );
                snackBarRef.onAction().subscribe(() => {
                    this.sessionService.undoRemoveBundleFromCart();
                    this.transaction = this.sessionService.getCart();
                });
            }
        } else {
            // single line item
            this.sessionService.removeFromCart(lineItemIndex);
            this.transaction = this.sessionService.getCart();
            const snackBarRef = this.snackBar.open(
                'Item removed from cart successfully!',
                'Undo',
                {
                    duration: 4500,
                }
            );
            snackBarRef.onAction().subscribe(() => {
                this.sessionService.undoDeleteFromCart();
                this.transaction = this.sessionService.getCart();
            });
        }
    }

    clearCart(): void {
        this.sessionService.clearCart();
        this.transaction = this.sessionService.getCart();
        const snackBarRef = this.snackBar.open(
            'Cart cleared successfully!',
            'Undo',
            {
                duration: 4500,
            }
        );
        snackBarRef.onAction().subscribe(() => {
            this.sessionService.undoClearCart();
            this.transaction = this.sessionService.getCart();
        });
    }

    handleCheckoutRequest(): void {
        if (this.sessionService.getIsLogin()) {
            this.router.navigate(['/checkout']);
        } else {
            this.router.navigate(['/login']);
            this.snackBar.open(
                'You are not logged in yet, login now to continue your checkout!',
                'Close',
                {
                    duration: 4500,
                }
            );
        }
    }

    getTotalCost(): number {
        return this.transaction.transactionLineItems
            .map((t) => t.price * t.quantity)
            .reduce((acc, value) => acc + value, 0);
    }
}
