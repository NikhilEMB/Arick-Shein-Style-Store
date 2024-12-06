import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBannersPage } from './admin-banners.page';

describe('AdminBannersPage', () => {
  let component: AdminBannersPage;
  let fixture: ComponentFixture<AdminBannersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBannersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBannersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
