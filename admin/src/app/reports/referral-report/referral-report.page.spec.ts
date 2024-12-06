import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralReportPage } from './referral-report.page';

describe('ReferralReportPage', () => {
  let component: ReferralReportPage;
  let fixture: ComponentFixture<ReferralReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
