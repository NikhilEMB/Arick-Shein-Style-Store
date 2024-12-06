import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCsvCreatorPage } from './product-csv-creator.page';

describe('ProductCsvCreatorPage', () => {
  let component: ProductCsvCreatorPage;
  let fixture: ComponentFixture<ProductCsvCreatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCsvCreatorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCsvCreatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
