import { Component, OnInit } from '@angular/core';

import { SessionService } from './service/session.service';

import { Transaction } from './classes/transaction';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'TellybuddyAngular';

    constructor(public sessionService: SessionService) {}

    ngOnInit() {
        if (!sessionStorage.currentCart) {
            let newTransaction: Transaction = {
                transactionId: undefined,
                totalPrice: undefined,
                voidRefund: false,
                transactionDateTime: undefined,
                payment: undefined,
                customer: undefined,
                discountCode: undefined,
                transactionLineItems: [],
            };
            this.sessionService.setCart(newTransaction);
        }
    }
}
