import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCartPage } from './user-cart.page';

describe('UserCartPage', () => {
  let component: UserCartPage;
  let fixture: ComponentFixture<UserCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
