import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { Customer } from '../classes/customer';
import { FamilyGroup } from '../classes/family-group';
import { Subscription } from '../classes/subscription';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class FamilyGroupService {
    baseUrl: string = '/api/FamilyGroup';
    constructor(
        private httpClient: HttpClient,
        private sessionService: SessionService
    ) {}
    //=======================Main page
    //For customer with no family group
    createFamilyGroup(
        familyGroup: FamilyGroup,
        customer: Customer
    ): Observable<any> {
        let createFamilyGroupReq = {
            username: this.sessionService.getUsername(),
            password: this.sessionService.getPassword(),
        };

        createFamilyGroupReq['familyGroup'] = familyGroup;
        createFamilyGroupReq['customer'] = customer;

        return this.httpClient
            .put<any>(this.baseUrl, createFamilyGroupReq, httpOptions)
            .pipe(catchError(this.handleError));
    }
    //For customer with family group
    getFamilyGroupUnderThisCustomer(): Observable<any> {
        return this.httpClient
            .get<any>(
                this.baseUrl +
                    '/retrieveCustomerFamilyGroup?username=' +
                    this.sessionService.getUsername() +
                    '&password=' +
                    this.sessionService.getPassword()
            )
            .pipe(catchError(this.handleError));
    }

    //Donate to the pool
    donateUnitsToFamilyGroup(
        dataUnits: number,
        smsUnits: number,
        talktimeUnits: number,
        subscription: Subscription,
        customer: Customer,
        familyGroup: FamilyGroup
    ): Observable<any> {
        let donateUnitsToFamilyGroupReq = {
            username: this.sessionService.getUsername(),
            password: this.sessionService.getPassword(),
            dataUnits: dataUnits,
            smsUnits: smsUnits,
            talktimeUnits: talktimeUnits,
        };
        donateUnitsToFamilyGroupReq['familyGroup'] = familyGroup;
        donateUnitsToFamilyGroupReq['customer'] = customer;
        donateUnitsToFamilyGroupReq['subscription'] = subscription;
        return this.httpClient
            .post<any>(
                this.baseUrl + '/donateUnitsToFamilyGroup',
                donateUnitsToFamilyGroupReq,
                httpOptions
            )
            .pipe(catchError(this.handleError));
    }

    //Consume from the pool
    consumeUnitsFromFamilyGroup(
        dataUnits: number,
        smsUnits: number,
        talktimeUnits: number,
        subscription: Subscription,
        customer: Customer,
        familyGroup: FamilyGroup
    ): Observable<any> {
        let consumeUnitsFromFamilyGroupReq = {
            username: this.sessionService.getUsername(),
            password: this.sessionService.getPassword(),
            dataUnits: dataUnits,
            smsUnits: smsUnits,
            talktimeUnits: talktimeUnits,
        };
        consumeUnitsFromFamilyGroupReq['familyGroup'] = familyGroup;
        consumeUnitsFromFamilyGroupReq['customer'] = customer;
        consumeUnitsFromFamilyGroupReq['subscription'] = subscription;
        return this.httpClient
            .post<any>(
                this.baseUrl + '/consumeUnitsFromFamilyGroup',
                consumeUnitsFromFamilyGroupReq,
                httpOptions
            )
            .pipe(catchError(this.handleError));
    }
    //============================Members
    //View list of customers under family group (customer.service)

    //Add family group member
    addFamilyGroupMember(
        familyGroup: FamilyGroup,
        customer: Customer
    ): Observable<any> {
        let addFamilyGroupMemberReq = {
            username: this.sessionService.getUsername(),
            password: this.sessionService.getPassword(),
        };

        addFamilyGroupMemberReq['familyGroup'] = familyGroup;
        addFamilyGroupMemberReq['customer'] = customer;

        return this.httpClient
            .post<any>(
                this.baseUrl + '/addFamilyGroupMember',
                addFamilyGroupMemberReq,
                httpOptions
            )
            .pipe(catchError(this.handleError));
    }

    //View list of active subscription under customer(subscription.service)

    //Remove family member
    removeFamilyGroupMember(
        familyGroup: FamilyGroup,
        customer: Customer
    ): Observable<any> {
        let removeFamilyGroupMemberReq = {
            username: this.sessionService.getUsername(),
            password: this.sessionService.getPassword(),
        };

        removeFamilyGroupMemberReq['familyGroup'] = familyGroup;
        removeFamilyGroupMemberReq['customer'] = customer;

        return this.httpClient
            .post<any>(
                this.baseUrl + '/removeFamilyGroupMember',
                removeFamilyGroupMemberReq,
                httpOptions
            )
            .pipe(catchError(this.handleError));
    }

    //==========================Settings
    //update family group
    updateFamilyGroup(familyGroup: FamilyGroup): Observable<any> {
        let updateFamilyGroupReq = {
            username: this.sessionService.getUsername(),
            password: this.sessionService.getPassword(),
        };
        updateFamilyGroupReq['familyGroup'] = familyGroup;
        return this.httpClient
            .post<any>(
                this.baseUrl + '/updateFamilyGroup',
                updateFamilyGroupReq,
                httpOptions
            )
            .pipe(catchError(this.handleError));
    }

    //remove family group
    deleteFamilyGroup(familyGroupId: number): Observable<any> {
        return this.httpClient
            .delete<any>(
                this.baseUrl +
                    '/deleteFamilyGroup/' +
                    familyGroupId +
                    '?username=' +
                    this.sessionService.getUsername() +
                    '&password=' +
                    this.sessionService.getPassword() +
                    '&familyGroupId=' +
                    familyGroupId
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
