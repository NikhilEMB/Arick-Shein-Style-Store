import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingOrdersPage } from './booking-orders.page';

describe('BookingOrdersPage', () => {
  let component: BookingOrdersPage;
  let fixture: ComponentFixture<BookingOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingOrdersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
