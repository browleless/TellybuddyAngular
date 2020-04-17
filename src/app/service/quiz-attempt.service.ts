import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';

import { QuizAttempt } from '../classes/quiz-attempt';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class QuizAttemptService {
    baseUrl: string = '/api/QuizAttempt';

    constructor(
        private httpClient: HttpClient,
        private sessionService: SessionService
    ) {}

    createNewQuizAttempt(newQuizAttempt: QuizAttempt): Observable<any> {
        let createNewQuizAttemptReq = {
            username: this.sessionService.getUsername(),
            password: this.sessionService.getPassword(),
            customer: this.sessionService.getCurrentCustomer(),
            quiz: newQuizAttempt.quiz,
            quizResponses: newQuizAttempt.responses,
        };

        return this.httpClient
            .put<any>(this.baseUrl, createNewQuizAttemptReq, httpOptions)
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
