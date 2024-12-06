import { TestBed } from '@angular/core/testing';

import { ProductAddonsService } from './product-addons.service';

describe('ProductAddonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductAddonsService = TestBed.get(ProductAddonsService);
    expect(service).toBeTruthy();
  });
});
