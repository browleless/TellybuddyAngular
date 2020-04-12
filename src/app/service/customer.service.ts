import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Customer } from '../classes/customer';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    baseUrl: string = '/api/Customer';

    constructor(private httpClient: HttpClient) {}

    customerLogin(username: string, password: string): Observable<any> {
        return this.httpClient
            .get<any>(
                this.baseUrl +
                    '/customerLogin?username=' +
                    username +
                    '&password=' +
                    password
            )
            .pipe(catchError(this.handleError));
    }

    requestPasswordReset(email: string): Observable<any> {
        return this.httpClient
            .get<any>(this.baseUrl + '/resetPasswordRequest?email=' + email)
            .pipe(catchError(this.handleError));
    }

    retrieveCustomerBySalt(salt: string): Observable<any> {
        return this.httpClient
            .get<any>(this.baseUrl + '/retrieveCustomerBySalt/' + salt)
            .pipe(catchError(this.handleError));
    }

    retrieveCustomerByEmail(email: string): Observable<any> {
        return this.httpClient
            .get<any>(this.baseUrl + '/retrieveCustomerByEmail?email=' + email)
            .pipe(catchError(this.handleError));
    }

    changePassword(customer: Customer): Observable<any> {
        let changePasswordReq = {
            customer: customer,
        };
        return this.httpClient
            .post<any>(
                this.baseUrl + '/changePassword',
                changePasswordReq,
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