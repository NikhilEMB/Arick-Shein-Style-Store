import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsReportPage } from './products-report.page';

describe('ProductsReportPage', () => {
  let component: ProductsReportPage;
  let fixture: ComponentFixture<ProductsReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
