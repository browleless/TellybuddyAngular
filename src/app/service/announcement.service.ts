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
export class AnnouncementService {
    baseUrl: string = '/api/Announcement';

    constructor(
        private httpClient: HttpClient,
        private sessionService: SessionService
    ) {}

    retrieveAllAnnouncements(): Observable<any> {
        return this.httpClient
            .get<any>(
                this.baseUrl + '/retrieveAllActiveAnnouncementsForCustomers' + '?username=' +
                
                this.sessionService.getUsername() +
                '&password=' +
                this.sessionService.getPassword()
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
