import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationEditPage } from './quotation-edit.page';

describe('QuotationEditPage', () => {
  let component: QuotationEditPage;
  let fixture: ComponentFixture<QuotationEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
