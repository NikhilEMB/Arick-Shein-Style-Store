import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorReportPage } from './vendor-report.page';

describe('VendorReportPage', () => {
  let component: VendorReportPage;
  let fixture: ComponentFixture<VendorReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
