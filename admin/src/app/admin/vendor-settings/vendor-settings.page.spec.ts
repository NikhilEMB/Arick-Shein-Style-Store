import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSettingsPage } from './vendor-settings.page';

describe('VendorSettingsPage', () => {
  let component: VendorSettingsPage;
  let fixture: ComponentFixture<VendorSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorSettingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
