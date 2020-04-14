import { TestBed } from '@angular/core/testing';

import { PhoneNumberServiceService } from './phone-number-service.service';

describe('PhoneNumberServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhoneNumberServiceService = TestBed.get(PhoneNumberServiceService);
    expect(service).toBeTruthy();
  });
});
