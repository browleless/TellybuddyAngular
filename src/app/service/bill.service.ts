import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Subscription } from '../classes/subscription';
import { Customer } from '../classes/customer';

import { SessionService } from './session.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class BillService {
    baseUrl: string = '/api/Bill';

    constructor(
        private httpClient: HttpClient,
        private sessionService: SessionService
    ) {}

    retrieveSubscriptionBills(subscription: Subscription): Observable<any> {
        let retrieveSubscriptionBillsReq = {
            username: this.sessionService.getUsername(),
            password: this.sessionService.getPassword(),
            subscription: subscription,
        };
        return this.httpClient
            .post<any>(
                this.baseUrl + '/retrieveBillsBySubscription',
                retrieveSubscriptionBillsReq,
                httpOptions
            )
            .pipe(catchError(this.handleError));
    }

    retrieveCustomerOutstandingBills(customer: Customer): Observable<any> {
        let retrieveCustomerOutstandingBillsReq = {
            username: this.sessionService.getUsername(),
            password: this.sessionService.getPassword(),
            customer: customer,
        };
        return this.httpClient
            .post<any>(
                this.baseUrl + '/retrieveCustomerOutstandingBills',
                retrieveCustomerOutstandingBillsReq,
                httpOptions
            )
            .pipe(catchError(this.handleError));
    }

    retrieveSubscriptionOutstandingBills(
        subscription: Subscription
    ): Observable<any> {
        let retrieveSubscriptionOutstandingBillsReq = {
            username: this.sessionService.getUsername(),
            password: this.sessionService.getPassword(),
            subscription: subscription,
        };
        return this.httpClient
            .post<any>(
                this.baseUrl + '/retrieveSubscriptionOutstandingBills',
                retrieveSubscriptionOutstandingBillsReq,
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
