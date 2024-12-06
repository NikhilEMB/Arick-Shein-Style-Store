import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMembershipPage } from './vendor-membership.page';

describe('VendorMembershipPage', () => {
  let component: VendorMembershipPage;
  let fixture: ComponentFixture<VendorMembershipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorMembershipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorMembershipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
