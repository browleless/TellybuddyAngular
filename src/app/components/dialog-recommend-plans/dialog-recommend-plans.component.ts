import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SessionService } from 'src/app/service/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogRecommendPlansData } from './dialog-recommend-plans-data';
import { LuxuryProduct } from 'src/app/classes/luxury-product';
import { Plan } from 'src/app/classes/plan';
import { PlanService } from 'src/app/service/plan.service';
import { LuxuryproductsComponent } from '../luxuryproducts/luxuryproducts.component';
import { TransactionLineItem } from 'src/app/classes/transaction-line-item';

@Component({
    selector: 'app-dialog-recommend-plans',
    templateUrl: './dialog-recommend-plans.component.html',
    // template: `
    //     <app-dialog-recommend-plans
    //         [selectedLineItem]="lineItem"
    //     ></app-dialog-recommend-plans>
    // `,
    styleUrls: ['./dialog-recommend-plans.component.css'],
})
export class DialogRecommendPlansComponent implements OnInit {
    selectedLineItem: TransactionLineItem;

    constructor(
        public dialogRef: MatDialogRef<DialogRecommendPlansComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogRecommendPlansData,
        public sessionService: SessionService,
        private snackBar: MatSnackBar,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private planService: PlanService,
        private breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit() {}

    closeDialog(): void {
        this.selectedLineItem = this.data.lineItem;
        this.dialogRef.close();
    }

    // goToBundlePlans(): void {
    //     this.router.navigate(['/bundlePlans'], {state: {data: {selectedLineItem}}});
    // }

    closeDialogNoThanks(): void {
        this.selectedLineItem = this.data.lineItem;
        this.sessionService.addToCart(this.data.lineItem);

        const snackBarRef = this.snackBar.open(
            'Successfully added Product: "' +
                this.data.lineItem.productItem.luxuryProduct.name +
                '" to the cart!',
            'Undo',
            {
                duration: 4500,
            }
        );

        snackBarRef.onAction().subscribe(() => {
            this.sessionService.undoAddToCart();
        });

        this.dialogRef.close();
    }
}
