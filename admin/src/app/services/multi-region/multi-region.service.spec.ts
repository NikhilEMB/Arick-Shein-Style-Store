import { TestBed } from '@angular/core/testing';

import { MultiRegionService } from './multi-region.service';

describe('MultiRegionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MultiRegionService = TestBed.get(MultiRegionService);
    expect(service).toBeTruthy();
  });
});
