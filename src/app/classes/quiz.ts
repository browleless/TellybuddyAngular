import { QuizAttempt } from './quiz-attempt';
import { Questions } from './questions';

export class Quiz {
    quizId: number;
    name: string;
    openDate: Date;
    expiryDate: Date;
    unitsWorth: number;
    quizAttempts: QuizAttempt[];
    questions: Questions[];
    constructor(
        quizId?: number,
        name?: string,
        openDate?: Date,
        expiryDate?: Date,
        unitsWorth?: number,
        quizAttempts?: QuizAttempt[],
        questions?: Questions[]
    ) {
        this.questions = questions;
        this.quizAttempts = quizAttempts;
        this.quizId = quizId;
        this.name = name;
        this.openDate = openDate;
        this.expiryDate = expiryDate;
        this.unitsWorth = unitsWorth;
    }
}
