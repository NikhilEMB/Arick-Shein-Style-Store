import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRequestModalPage } from './vendor-request-modal.page';

describe('VendorRequestModalPage', () => {
  let component: VendorRequestModalPage;
  let fixture: ComponentFixture<VendorRequestModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorRequestModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorRequestModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
