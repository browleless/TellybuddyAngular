import { TestBed } from '@angular/core/testing';

import { QuizAttemptService } from './quiz-attempt.service';

describe('QuizAttemptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizAttemptService = TestBed.get(QuizAttemptService);
    expect(service).toBeTruthy();
  });
});
