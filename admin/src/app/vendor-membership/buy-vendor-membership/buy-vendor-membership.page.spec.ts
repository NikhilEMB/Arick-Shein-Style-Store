import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyVendorMembershipPage } from './buy-vendor-membership.page';

describe('BuyVendorMembershipPage', () => {
  let component: BuyVendorMembershipPage;
  let fixture: ComponentFixture<BuyVendorMembershipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyVendorMembershipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyVendorMembershipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
