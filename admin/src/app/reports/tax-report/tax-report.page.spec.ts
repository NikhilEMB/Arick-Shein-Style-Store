import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxReportPage } from './tax-report.page';

describe('TaxReportPage', () => {
  let component: TaxReportPage;
  let fixture: ComponentFixture<TaxReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
