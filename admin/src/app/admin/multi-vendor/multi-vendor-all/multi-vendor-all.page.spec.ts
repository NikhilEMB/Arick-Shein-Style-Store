import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiVendorAllPage } from './multi-vendor-all.page';

describe('MultiVendorAllPage', () => {
  let component: MultiVendorAllPage;
  let fixture: ComponentFixture<MultiVendorAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiVendorAllPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiVendorAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
