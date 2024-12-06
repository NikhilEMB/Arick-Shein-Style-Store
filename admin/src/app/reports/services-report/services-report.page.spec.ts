import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesReportPage } from './services-report.page';

describe('ServicesReportPage', () => {
  let component: ServicesReportPage;
  let fixture: ComponentFixture<ServicesReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
