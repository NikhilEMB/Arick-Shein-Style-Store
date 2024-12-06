import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorProductsPage } from './vendor-products.page';

describe('VendorProductsPage', () => {
  let component: VendorProductsPage;
  let fixture: ComponentFixture<VendorProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorProductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
