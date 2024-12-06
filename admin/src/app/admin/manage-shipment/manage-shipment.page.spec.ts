import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShipmentPage } from './manage-shipment.page';

describe('ManageShipmentPage', () => {
  let component: ManageShipmentPage;
  let fixture: ComponentFixture<ManageShipmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageShipmentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageShipmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
