import { TestBed } from '@angular/core/testing';

import { WhatsappDashboardService } from './whatsapp-dashboard.service';

describe('WhatsappDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhatsappDashboardService = TestBed.get(WhatsappDashboardService);
    expect(service).toBeTruthy();
  });
});
