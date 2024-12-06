import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportManagerPage } from './import-export-manager.page';

describe('ImportExportManagerPage', () => {
  let component: ImportExportManagerPage;
  let fixture: ComponentFixture<ImportExportManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportExportManagerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExportManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
