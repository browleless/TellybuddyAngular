import { TestBed } from '@angular/core/testing';

import { FamilyGroupService } from './family-group.service';

describe('FamilyGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FamilyGroupService = TestBed.get(FamilyGroupService);
    expect(service).toBeTruthy();
  });
});
