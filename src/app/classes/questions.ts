import { Quiz } from './quiz';
import { Answer } from './answer';

export class Questions {
    questionId: number;
    question: string;
    quiz: Quiz;
    answers: Answer[];
    constructor(
        questionId?: number,
        question?: string,
        quiz?: Quiz,
        answers?: Answer[]
    ) {
        this.answers = answers;
        this.quiz = quiz;
        this.questionId = questionId;
        this.question = question;
    }
}
