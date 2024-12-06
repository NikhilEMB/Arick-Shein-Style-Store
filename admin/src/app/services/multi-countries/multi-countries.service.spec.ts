import { TestBed } from '@angular/core/testing';

import { MultiCountriesService } from './multi-countries.service';

describe('MultiCountriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MultiCountriesService = TestBed.get(MultiCountriesService);
    expect(service).toBeTruthy();
  });
});
