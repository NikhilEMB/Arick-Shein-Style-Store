import { TestBed } from '@angular/core/testing';

import { ProductOptionsService } from './product-options.service';

describe('ProductOptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductOptionsService = TestBed.get(ProductOptionsService);
    expect(service).toBeTruthy();
  });
});
