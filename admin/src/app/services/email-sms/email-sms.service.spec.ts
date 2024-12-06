import { TestBed } from '@angular/core/testing';

import { EmailSmsService } from './email-sms.service';

describe('EmailSmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailSmsService = TestBed.get(EmailSmsService);
    expect(service).toBeTruthy();
  });
});
