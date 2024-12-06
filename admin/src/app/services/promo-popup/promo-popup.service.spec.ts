import { TestBed } from '@angular/core/testing';

import { PromoPopupService } from './promo-popup.service';

describe('PromoPopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromoPopupService = TestBed.get(PromoPopupService);
    expect(service).toBeTruthy();
  });
});
