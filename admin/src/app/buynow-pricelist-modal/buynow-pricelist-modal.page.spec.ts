import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuynowPricelistModalPage } from './buynow-pricelist-modal.page';

describe('BuynowPricelistModalPage', () => {
  let component: BuynowPricelistModalPage;
  let fixture: ComponentFixture<BuynowPricelistModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuynowPricelistModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuynowPricelistModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
