import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class SubscriptionService {
    baseUrl: string = '/api/Subscription';

    constructor(
        private httpClient: HttpClient,
        private sessionService: SessionService
    ) {}

    retrieveAllCustomerSubscriptions(): Observable<any> {
        return this.httpClient
            .get<any>(
                this.baseUrl +
                    '/retrieveAllCustomerSubscriptions?username=' +
                    this.sessionService.getUsername() +
                    '&password=' +
                    this.sessionService.getPassword()
            )
            .pipe(catchError(this.handleError));
    }

    retrieveActiveSubscriptionUnderCustomer(
        customerId: number
    ): Observable<any> {
        return this.httpClient
            .get<any>(
                this.baseUrl +
                    '/retrieveActive/' +
                    customerId +
                    '?username=' +
                    this.sessionService.getUsername() +
                    '&password=' +
                    this.sessionService.getPassword() +
                    '&customerId=' +
                    customerId
            )
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage: string = '';

        if (error.error instanceof ErrorEvent) {
            errorMessage =
                'An unknown error has occurred: ' + error.error.message;
        } else {
            errorMessage =
                'A HTTP error has occurred: ' +
                `HTTP ${error.status}: ${error.error.message}`;
        }

        console.error(errorMessage);

        return throwError(errorMessage);
    }
}
