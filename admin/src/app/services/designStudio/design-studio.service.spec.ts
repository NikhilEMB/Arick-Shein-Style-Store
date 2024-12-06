import { TestBed } from '@angular/core/testing';

import { DesignStudioService } from './design-studio.service';

describe('DesignStudioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesignStudioService = TestBed.get(DesignStudioService);
    expect(service).toBeTruthy();
  });
});
