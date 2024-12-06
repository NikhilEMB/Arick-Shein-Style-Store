import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCodesPage } from './coupon-codes.page';

describe('CouponCodesPage', () => {
  let component: CouponCodesPage;
  let fixture: ComponentFixture<CouponCodesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponCodesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
