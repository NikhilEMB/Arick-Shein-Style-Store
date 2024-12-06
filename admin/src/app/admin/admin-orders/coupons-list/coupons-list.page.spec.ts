import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsListPage } from './coupons-list.page';

describe('CouponsListPage', () => {
  let component: CouponsListPage;
  let fixture: ComponentFixture<CouponsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
