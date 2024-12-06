import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeProductsPage } from './free-products.page';

describe('FreeProductsPage', () => {
  let component: FreeProductsPage;
  let fixture: ComponentFixture<FreeProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeProductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
