import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderHistoryPage } from './user-order-history.page';

describe('UserOrderHistoryPage', () => {
  let component: UserOrderHistoryPage;
  let fixture: ComponentFixture<UserOrderHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrderHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrderHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
