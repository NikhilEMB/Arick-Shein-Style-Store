import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePaymentPage } from './complete-payment.page';

describe('CompletePaymentPage', () => {
  let component: CompletePaymentPage;
  let fixture: ComponentFixture<CompletePaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletePaymentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletePaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
