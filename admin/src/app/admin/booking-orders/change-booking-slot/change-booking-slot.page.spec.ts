import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBookingSlotPage } from './change-booking-slot.page';

describe('ChangeBookingSlotPage', () => {
  let component: ChangeBookingSlotPage;
  let fixture: ComponentFixture<ChangeBookingSlotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeBookingSlotPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBookingSlotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
