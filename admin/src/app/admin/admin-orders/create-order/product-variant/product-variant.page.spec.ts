import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariantPage } from './product-variant.page';

describe('ProductVariantPage', () => {
  let component: ProductVariantPage;
  let fixture: ComponentFixture<ProductVariantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVariantPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVariantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
