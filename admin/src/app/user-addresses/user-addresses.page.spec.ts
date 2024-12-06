import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressesPage } from './user-addresses.page';

describe('UserAddressesPage', () => {
  let component: UserAddressesPage;
  let fixture: ComponentFixture<UserAddressesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddressesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddressesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
