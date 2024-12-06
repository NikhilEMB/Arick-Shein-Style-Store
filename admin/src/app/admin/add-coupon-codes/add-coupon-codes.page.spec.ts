import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCouponCodesPage } from './add-coupon-codes.page';

describe('AddCouponCodesPage', () => {
  let component: AddCouponCodesPage;
  let fixture: ComponentFixture<AddCouponCodesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCouponCodesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCouponCodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
