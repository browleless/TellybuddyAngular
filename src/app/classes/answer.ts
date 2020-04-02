import { Questions } from './questions';

export class Answer {
    answerId: number;
    answer: string;
    isAnswer: boolean;
    question: Questions;
    constructor(
        answerId?: number,
        answer?: string,
        isAnswer?: boolean,
        question?: Questions
    ) {
        this.answerId = answerId;
        this.answer = answer;
        this.isAnswer = isAnswer;
        this.question = question;
    }
}
