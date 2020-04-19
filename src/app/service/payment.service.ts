import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';

import { Payment } from '../classes/payment';
import { Bill } from '../classes/bill';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    baseUrl: string = '/api/Payment';

    constructor(
        private httpClient: HttpClient,
        private sessionService: SessionService
    ) {}

    createNewBillPayment(newBillPayment: Payment, bill: Bill): Observable<any> {
        let makeBillPaymentReq = {
            username: this.sessionService.getUsername(),
            password: this.sessionService.getPassword(),
            payment: newBillPayment,
            bill: bill,
        };

        return this.httpClient
            .put<any>(this.baseUrl, makeBillPaymentReq, httpOptions)
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
