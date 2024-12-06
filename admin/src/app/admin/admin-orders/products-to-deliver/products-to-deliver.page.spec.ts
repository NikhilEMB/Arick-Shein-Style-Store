import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsToDeliverPage } from './products-to-deliver.page';

describe('ProductsToDeliverPage', () => {
  let component: ProductsToDeliverPage;
  let fixture: ComponentFixture<ProductsToDeliverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsToDeliverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsToDeliverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
