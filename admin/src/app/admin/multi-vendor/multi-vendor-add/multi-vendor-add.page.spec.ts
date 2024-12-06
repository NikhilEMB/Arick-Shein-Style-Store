import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiVendorAddPage } from './multi-vendor-add.page';

describe('MultiVendorAddPage', () => {
  let component: MultiVendorAddPage;
  let fixture: ComponentFixture<MultiVendorAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiVendorAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiVendorAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
