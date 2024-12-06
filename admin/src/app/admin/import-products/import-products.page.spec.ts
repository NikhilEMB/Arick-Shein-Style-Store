import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProductsPage } from './import-products.page';

describe('ImportProductsPage', () => {
  let component: ImportProductsPage;
  let fixture: ComponentFixture<ImportProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportProductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
