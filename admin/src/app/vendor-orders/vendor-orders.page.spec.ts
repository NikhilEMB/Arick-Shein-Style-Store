import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorOrdersPage } from './vendor-orders.page';

describe('VendorOrdersPage', () => {
  let component: VendorOrdersPage;
  let fixture: ComponentFixture<VendorOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorOrdersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
