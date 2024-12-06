import { TestBed } from '@angular/core/testing';

import { CustomLanguageService } from './custom-language.service';

describe('CustomLanguageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomLanguageService = TestBed.get(CustomLanguageService);
    expect(service).toBeTruthy();
  });
});
