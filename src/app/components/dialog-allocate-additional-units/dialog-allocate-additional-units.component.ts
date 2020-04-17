import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAllocateAdditionalUnitsData } from './dialog-allocate-additional-units-data';
import { MatSnackBar } from '@angular/material';

import { SubscriptionService } from 'src/app/service/subscription.service';
import { SessionService } from 'src/app/service/session.service';
import { QuizAttemptService } from 'src/app/service/quiz-attempt.service';

import { Subscription } from 'src/app/classes/subscription';

@Component({
    selector: 'app-dialog-allocate-additional-units',
    templateUrl: './dialog-allocate-additional-units.component.html',
    styleUrls: ['./dialog-allocate-additional-units.component.css'],
})
export class DialogAllocateAdditionalUnitsComponent implements OnInit {
    @ViewChild('dataSlider', { static: false }) dataSlider;
    @ViewChild('smsSlider', { static: false }) smsSlider;
    @ViewChild('talktimeSlider', { static: false }) talktimeSlider;

    customerSubscriptions: Subscription[];
    selectedSubscription: Subscription;

    dataUnits: number = 0;
    smsUnits: number = 0;
    talktimeUnits: number = 0;
    dataConversionRate: number = 0;
    smsConversionRate: number = 0;
    talktimeConversionRate: number = 0;

    loaded: boolean = false;
    selectedSubscriptionIndex = -1;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public dialogRef: MatDialogRef<DialogAllocateAdditionalUnitsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogAllocateAdditionalUnitsData,
        private subscriptionService: SubscriptionService,
        public sessionService: SessionService,
        private quizAttemptService: QuizAttemptService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.subscriptionService.retrieveAllCustomerSubscriptions().subscribe(
            (response) => {
                this.customerSubscriptions = response.subscriptions;
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    selectSubscription(index: number): void {
        this.selectedSubscription = this.customerSubscriptions[index];
        this.selectedSubscriptionIndex = index;
        this.dataConversionRate = this.selectedSubscription.plan.dataConversionRate;
        this.smsConversionRate = this.selectedSubscription.plan.smsConversionRate;
        this.talktimeConversionRate = this.selectedSubscription.plan.talktimeConversionRate;
    }

    handleDataSliderChange(value: number): void {
        if (
            value - this.dataUnits <= this.getRemainingUnits() ||
            value <= this.dataUnits
        ) {
            this.dataUnits = value;
        } else {
            this.dataSlider.value = this.dataUnits;
        }
    }

    handleSmsSliderChange(value: number): void {
        if (
            value - this.smsUnits <= this.getRemainingUnits() ||
            value <= this.smsUnits
        ) {
            this.smsUnits = value;
        } else {
            this.smsSlider.value = this.smsUnits;
        }
    }

    handleTalktimeSliderChange(value: number): void {
        if (
            value - this.talktimeUnits <= this.getRemainingUnits() ||
            value <= this.talktimeUnits
        ) {
            this.talktimeUnits = value;
        } else {
            this.talktimeSlider.value = this.talktimeUnits;
        }
    }

    handleQuizSubmission(): void {
        this.quizAttemptService
            .createNewQuizAttempt(this.data.quizAttempt)
            .subscribe(
                (response) => {
                    this.snackBar.open(
                        'Responses recorded and extra units added to ' +
                            this.selectedSubscription.phoneNumber.phoneNumber.substring(
                                0,
                                4
                            ) +
                            ' ' +
                            this.selectedSubscription.phoneNumber.phoneNumber.substring(
                                4
                            ) +
                            ' successfully!',
                        'Close',
                        { duration: 4500 }
                    );
                    this.router.navigate(['/additionalUnits']);
                },
                (error) => {
                    console.log(error);
                }
            );

        this.subscriptionService
            .allocateQuizExtraUnits(
                this.selectedSubscription,
                this.dataUnits,
                this.smsUnits,
                this.talktimeUnits
            )
            .subscribe(
                (response) => {},
                (error) => {
                    console.log(error);
                }
            );

        this.dialogRef.close();
    }

    getRemainingUnits(): number {
        return (
            this.data.unitsWorth -
            this.dataUnits -
            this.smsUnits -
            this.talktimeUnits
        );
    }

    onExitClick(): void {
        this.dialogRef.close();
    }
}
