import { TestBed } from '@angular/core/testing';

import { DiscountCodeService } from './discount-code.service';

describe('DiscountCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscountCodeService = TestBed.get(DiscountCodeService);
    expect(service).toBeTruthy();
  });
});
