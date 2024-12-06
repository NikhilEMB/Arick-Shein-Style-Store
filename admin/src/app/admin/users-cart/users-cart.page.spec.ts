import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCartPage } from './users-cart.page';

describe('UsersCartPage', () => {
  let component: UsersCartPage;
  let fixture: ComponentFixture<UsersCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersCartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
