import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageImporterPage } from './product-image-importer.page';

describe('ProductImageImporterPage', () => {
  let component: ProductImageImporterPage;
  let fixture: ComponentFixture<ProductImageImporterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImageImporterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageImporterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
