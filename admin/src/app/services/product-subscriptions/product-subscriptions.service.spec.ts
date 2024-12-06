import { TestBed } from '@angular/core/testing';

import { ProductSubscriptionsService } from './product-subscriptions.service';

describe('ProductSubscriptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSubscriptionsService = TestBed.get(ProductSubscriptionsService);
    expect(service).toBeTruthy();
  });
});
