import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsReportPage } from './brands-report.page';

describe('BrandsReportPage', () => {
  let component: BrandsReportPage;
  let fixture: ComponentFixture<BrandsReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
