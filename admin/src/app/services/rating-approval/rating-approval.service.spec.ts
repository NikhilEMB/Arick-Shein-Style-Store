import { TestBed } from '@angular/core/testing';

import { RatingApprovalService } from './rating-approval.service';

describe('RatingApprovalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RatingApprovalService = TestBed.get(RatingApprovalService);
    expect(service).toBeTruthy();
  });
});
