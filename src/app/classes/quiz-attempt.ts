import { Customer } from './customer';
import { Quiz } from './quiz';
import { Response } from './response';

export class QuizAttempt {
    quizAttemptId: number;
    score: number;
    completedDate: Date;
    customer: Customer;
    quiz: Quiz;
    responses: Response[];
    constructor(
        quizAttemptId?: number,
        score?: number,
        completedDate?: Date,
        customer?: Customer,
        quiz?: Quiz,
        responses?: Response[]
    ) {
        this.quiz = quiz;
        this.responses = responses;
        this.customer = customer;
        this.quizAttemptId = quizAttemptId;
        this.score = score;
        this.completedDate = completedDate;
    }
}
