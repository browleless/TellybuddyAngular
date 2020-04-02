import { Questions } from './questions';
import { Answer } from './answer';

export class Response {
    responseId: number;
    isCorrect: boolean;
    question: Questions;
    answer: Answer;
    constructor(
        responseId?: number,
        isCorrect?: boolean,
        question?: Questions,
        answer?: Answer
    ) {
        this.question = question;
        this.answer = answer;
        this.responseId = responseId;
        this.isCorrect = isCorrect;
    }
}
