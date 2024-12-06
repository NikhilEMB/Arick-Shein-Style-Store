import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorModalPage } from './add-vendor-modal.page';

describe('AddVendorModalPage', () => {
  let component: AddVendorModalPage;
  let fixture: ComponentFixture<AddVendorModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVendorModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
