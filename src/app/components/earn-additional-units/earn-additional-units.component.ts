import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { QuizService } from 'src/app/service/quiz.service';
import { SubscriptionService } from 'src/app/service/subscription.service';

import { Quiz } from 'src/app/classes/quiz';
import { Subscription } from 'src/app/classes/subscription';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-earn-additional-units',
    templateUrl: './earn-additional-units.component.html',
    styleUrls: ['./earn-additional-units.component.css'],
})
export class EarnAdditionalUnitsComponent implements OnInit {
    loaded: boolean = false;
    isMobile: boolean = false;
    isTablet: boolean = false;
    isLaptop: boolean = false;

    quizzes: Quiz[];
    subscriptions: Subscription[];

    observables = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private breakpointObserver: BreakpointObserver,
        private quizService: QuizService,
        private subscriptionService: SubscriptionService
    ) {
        this.breakpointObserver
            .observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge,
            ])
            .subscribe((result) => {
                if (result.breakpoints[Breakpoints.XSmall]) {
                    this.isMobile = true;
                    this.isTablet = false;
                    this.isLaptop = false;
                }
                if (result.breakpoints[Breakpoints.Small]) {
                    this.isTablet = true;
                    this.isMobile = false;
                    this.isLaptop = false;
                }
                if (
                    result.breakpoints[Breakpoints.Medium] ||
                    result.breakpoints[Breakpoints.Large]
                ) {
                    this.isLaptop = true;
                    this.isMobile = false;
                    this.isTablet = false;
                }
                if (result.breakpoints[Breakpoints.XLarge]) {
                    this.isMobile = false;
                    this.isTablet = false;
                    this.isLaptop = false;
                }
            });
    }

    ngOnInit() {
        this.subscriptionService.retrieveAllCustomerSubscriptions().subscribe(
            (response) => {
                this.subscriptions = response.subscriptions;
            },
            (error) => {
                console.log(error);
            }
        );

        this.quizService.retrieveAllUnattemptedActiveQuizzes().subscribe(
            (response) => {
                this.quizzes = response.quizzes;
                if (this.quizzes.length) {
                    this.quizzes.forEach((quiz) => {
                        this.observables.push(
                            this.quizService.retrieveQuizUnattemptedFamilyMembers(
                                quiz
                            )
                        );
                    });
                    forkJoin(this.observables).subscribe((result) => {
                        for (let i = 0; i < result.length; i++) {
                            this.quizzes[i].familyGroupMembers =
                                result[i].familyGroupMembers;
                        }
                        this.loaded = true;
                    });
                } else {
                    this.loaded = true;
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    handleQuizClick(quizId: number): void {
        this.router.navigate(['additionalUnits/' + quizId]);
    }
}
