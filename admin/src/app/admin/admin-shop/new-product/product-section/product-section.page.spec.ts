import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSectionPage } from './product-section.page';

describe('ProductSectionPage', () => {
  let component: ProductSectionPage;
  let fixture: ComponentFixture<ProductSectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
