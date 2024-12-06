import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCsvImporterPage } from './product-csv-importer.page';

describe('ProductCsvImporterPage', () => {
  let component: ProductCsvImporterPage;
  let fixture: ComponentFixture<ProductCsvImporterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCsvImporterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCsvImporterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
