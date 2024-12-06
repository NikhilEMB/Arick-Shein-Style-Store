import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricelistModalPage } from './pricelist-modal.page';

describe('PricelistModalPage', () => {
  let component: PricelistModalPage;
  let fixture: ComponentFixture<PricelistModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricelistModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricelistModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
