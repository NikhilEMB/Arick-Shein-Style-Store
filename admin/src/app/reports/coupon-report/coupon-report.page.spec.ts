import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponReportPage } from './coupon-report.page';

describe('CouponReportPage', () => {
  let component: CouponReportPage;
  let fixture: ComponentFixture<CouponReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
