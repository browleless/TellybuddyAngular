import { QuizAttempt } from './quiz-attempt';
import { Questions } from './questions';
import { Customer } from './customer';

export class Quiz {
    quizId: number;
    name: string;
    openDate: Date;
    expiryDate: Date;
    unitsWorth: number;
    quizAttempts: QuizAttempt[];
    questions: Questions[];
    familyGroupMembers: Customer[];
    constructor(
        quizId?: number,
        name?: string,
        openDate?: Date,
        expiryDate?: Date,
        unitsWorth?: number,
        quizAttempts?: QuizAttempt[],
        questions?: Questions[],
        familyGroupMembers?: Customer[]
    ) {
        this.questions = questions;
        this.quizAttempts = quizAttempts;
        this.quizId = quizId;
        this.name = name;
        this.openDate = openDate;
        this.expiryDate = expiryDate;
        this.unitsWorth = unitsWorth;
        this.familyGroupMembers = familyGroupMembers;
    }
}
