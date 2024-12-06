import { TestBed } from '@angular/core/testing';

import { ProductSettingService } from './product-setting.service';

describe('ProductSettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSettingService = TestBed.get(ProductSettingService);
    expect(service).toBeTruthy();
  });
});
