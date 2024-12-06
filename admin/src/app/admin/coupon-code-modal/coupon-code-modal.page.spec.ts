import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCodeModalPage } from './coupon-code-modal.page';

describe('CouponCodeModalPage', () => {
  let component: CouponCodeModalPage;
  let fixture: ComponentFixture<CouponCodeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponCodeModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCodeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
