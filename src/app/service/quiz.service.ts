import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';

import { Quiz } from '../classes/quiz';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    baseUrl: string = '/api/Quiz';

    constructor(
        private httpClient: HttpClient,
        private sessionService: SessionService
    ) {}

    retrieveAllUnattemptedActiveQuizzes(): Observable<any> {
        return this.httpClient
            .get<any>(
                this.baseUrl +
                    '/retrieveAllUnattemptedActiveQuizzes?username=' +
                    this.sessionService.getUsername() +
                    '&password=' +
                    this.sessionService.getPassword()
            )
            .pipe(catchError(this.handleError));
    }

    retrieveQuizUnattemptedFamilyMembers(quiz: Quiz): Observable<any> {
        let retrieveQuizUnattemptedFamilyMembersReq = {
            username: this.sessionService.getUsername(),
            password: this.sessionService.getPassword(),
            customer: this.sessionService.getCurrentCustomer(),
            quiz: quiz,
        };
        return this.httpClient
            .post<any>(
                this.baseUrl + '/retrieveQuizUnattemptedFamilyMembers',
                retrieveQuizUnattemptedFamilyMembersReq,
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
