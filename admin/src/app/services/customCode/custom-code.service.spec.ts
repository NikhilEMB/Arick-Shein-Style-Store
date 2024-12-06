import { TestBed } from '@angular/core/testing';

import { CustomCodeService } from './custom-code.service';

describe('CustomCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomCodeService = TestBed.get(CustomCodeService);
    expect(service).toBeTruthy();
  });
});
