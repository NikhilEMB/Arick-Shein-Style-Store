import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddonsPage } from './product-addons.page';

describe('ProductAddonsPage', () => {
  let component: ProductAddonsPage;
  let fixture: ComponentFixture<ProductAddonsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAddonsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
