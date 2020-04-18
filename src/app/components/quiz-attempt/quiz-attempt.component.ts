import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTabChangeEvent, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { DialogAllocateAdditionalUnitsComponent } from '../dialog-allocate-additional-units/dialog-allocate-additional-units.component';

import { Questions } from 'src/app/classes/questions';
import { QuizAttempt } from 'src/app/classes/quiz-attempt';

import { QuestionService } from 'src/app/service/question.service';
import { SessionService } from 'src/app/service/session.service';
import { QuizAttemptService } from 'src/app/service/quiz-attempt.service';

@Component({
    selector: 'app-quiz-attempt',
    templateUrl: './quiz-attempt.component.html',
    styleUrls: ['./quiz-attempt.component.css'],
})
export class QuizAttemptComponent implements OnInit {
    loaded: boolean = false;
    isMobile: boolean = false;
    isTablet: boolean = false;
    isLaptop: boolean = false;

    quizId: number;
    questions: Questions[];

    selectedAnswer: number;
    answers: Map<number, number> = new Map();

    quizAttempt: QuizAttempt;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private breakpointObserver: BreakpointObserver,
        private questionService: QuestionService,
        private sessionService: SessionService,
        public dialog: MatDialog,
        private quizAttemptService: QuizAttemptService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.quizId = parseInt(
            this.activatedRoute.snapshot.paramMap.get('quizId')
        );

        this.questionService.retrieveQuestionsByQuizId(this.quizId).subscribe(
            (response) => {
                this.questions = response.questions;
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    handleTabChange(tabChangeEvent: MatTabChangeEvent) {
        this.selectedAnswer = this.answers.get(
            this.questions[tabChangeEvent.index].questionId
        );
    }

    handleAnswerSelection(questionId: number, answerId: number): void {
        this.answers.set(questionId, answerId);
    }

    handleQuizSubmit(): void {
        this.quizAttempt = {
            quizAttemptId: undefined,
            quiz: {
                quizId: this.quizId,
                expiryDate: undefined,
                name: undefined,
                openDate: undefined,
                questions: undefined,
                quizAttempts: undefined,
                unitsWorth: undefined,
                familyGroupMembers: undefined,
            },
            completedDate: undefined,
            customer: this.sessionService.getCurrentCustomer(),
            score: undefined,
            responses: [],
        };

        for (const [key, value] of this.answers.entries()) {
            this.quizAttempt.responses.push({
                question: {
                    questionId: key,
                    answers: undefined,
                    question: undefined,
                    quiz: undefined,
                },
                answer: {
                    answerId: value,
                    answer: undefined,
                    isAnswer: undefined,
                    question: undefined,
                },
                responseId: undefined,
                isCorrect: undefined,
            });
        }

        this.quizAttemptService
            .createNewQuizAttempt(this.quizAttempt)
            .subscribe(
                (response) => {
                    if (response.quizScore) {
                        this.dialog.open(
                            DialogAllocateAdditionalUnitsComponent,
                            {
                                disableClose: true,
                                data: {
                                    unitsWorth: response.quizScore,
                                    quizAttempt: this.quizAttempt,
                                },
                            }
                        );
                        this.snackBar.open(
                            'You earned ' +
                                response.quizScore +
                                ' units, allocate them now!',
                            'Close',
                            { duration: 4500 }
                        );
                    } else {
                        this.snackBar.open(
                            'Sorry, you did not manage to answer any questions correctly!',
                            'Close',
                            { duration: 4500 }
                        );
                        this.router.navigate(['/additionalUnits']);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    removeHtmlTag(text: string): string {
        return text.replace(/<[^>]*>/g, '');
    }
}
