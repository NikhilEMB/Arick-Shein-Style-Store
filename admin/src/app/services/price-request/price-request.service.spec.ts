import { TestBed } from '@angular/core/testing';

import { PriceRequestService } from './price-request.service';

describe('PriceRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriceRequestService = TestBed.get(PriceRequestService);
    expect(service).toBeTruthy();
  });
});
