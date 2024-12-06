import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShopPage } from './admin-shop.page';

describe('AdminShopPage', () => {
  let component: AdminShopPage;
  let fixture: ComponentFixture<AdminShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
