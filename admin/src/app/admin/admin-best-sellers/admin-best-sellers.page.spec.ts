import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBestSellersPage } from './admin-best-sellers.page';

describe('AdminBestSellersPage', () => {
  let component: AdminBestSellersPage;
  let fixture: ComponentFixture<AdminBestSellersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBestSellersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBestSellersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
