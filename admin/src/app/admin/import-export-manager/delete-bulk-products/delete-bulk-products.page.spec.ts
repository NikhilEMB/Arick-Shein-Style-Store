import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBulkProductsPage } from './delete-bulk-products.page';

describe('DeleteBulkProductsPage', () => {
  let component: DeleteBulkProductsPage;
  let fixture: ComponentFixture<DeleteBulkProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBulkProductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBulkProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
