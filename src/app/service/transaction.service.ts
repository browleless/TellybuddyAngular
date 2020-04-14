import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Transaction } from '../classes/transaction';

import { SessionService } from './session.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    baseUrl: string = '/api/Transaction';

    constructor(
        private httpClient: HttpClient,
        private sessionService: SessionService
    ) {}

    createNewTransaction(newTransaction: Transaction): Observable<any> {
        let createNewTransactionReq = {
            username: this.sessionService.getUsername(),
            password: this.sessionService.getPassword(),
            customerId: this.sessionService.getCurrentCustomer().customerId,
            discountCodeName: newTransaction.discountCode
                ? newTransaction.discountCode.discountCode
                : null,
            creditCardNo: newTransaction.payment.creditCardNumber,
            cvv: newTransaction.payment.cvv,
        };

        newTransaction.payment = null;

        createNewTransactionReq['newTransaction'] = newTransaction;

        return this.httpClient
            .put<any>(
                this.baseUrl + '/createNewTransaction',
                createNewTransactionReq,
                httpOptions
            )
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage: string = '';

        if (error.error instanceof ErrorEvent) {
            errorMessage =
                'An unknown error has occurred: ' + error.error.message;
        } else {
            if (error.error.message) {
                errorMessage = error.error.message;
            } else {
                errorMessage =
                    'A HTTP error has occurred: ' +
                    `HTTP ${error.status} (${error.statusText})`;
            }
        }

        console.error(errorMessage);

        return throwError(errorMessage);
    }
}
