import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { QuizService } from 'src/app/service/quiz.service';
import { SubscriptionService } from 'src/app/service/subscription.service';

import { Quiz } from 'src/app/classes/quiz';
import { Subscription } from 'src/app/classes/subscription';

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

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private breakpointObserver: BreakpointObserver,
        private quizService: QuizService,
        private subscriptionService: SubscriptionService
    ) {
        breakpointObserver
            .observe(['(max-width: 599px)'])
            .subscribe((result) => {
                this.isMobile = result.matches;
            });
        breakpointObserver
            .observe(['(max-width: 1279px)'])
            .subscribe((result) => {
                this.isTablet = result.matches;
                this.isMobile = false;
            });
        breakpointObserver
            .observe(['(max-width: 1919px)'])
            .subscribe((result) => {
                this.isLaptop = result.matches;
                this.isMobile = false;
                this.isTablet = false;
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
                this.loaded = true;
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
