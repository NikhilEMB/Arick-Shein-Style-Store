import { TestBed } from '@angular/core/testing';

import { ImportExportManagerService } from './import-export-manager.service';

describe('ImportExportManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportExportManagerService = TestBed.get(ImportExportManagerService);
    expect(service).toBeTruthy();
  });
});
