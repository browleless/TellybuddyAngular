import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = '/api/Product'

  constructor(private httpClient: HttpClient) { }

  retrieveAllNormalProducts(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '/retrieveAllNormalProducts').pipe(
      catchError(this.handleError)
    );
  }

  retrieveAllLuxuryProducts(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '/retrieveAllLuxuryProducts').pipe(
      catchError(this.handleError)
    );
  }

  retrieveAllDiscountedProducts(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '/retrieveAllDiscountedProducts').pipe(
      catchError(this.handleError)
    );
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
