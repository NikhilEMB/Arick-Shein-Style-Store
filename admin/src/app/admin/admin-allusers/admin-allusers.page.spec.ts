import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllusersPage } from './admin-allusers.page';

describe('AdminAllusersPage', () => {
  let component: AdminAllusersPage;
  let fixture: ComponentFixture<AdminAllusersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAllusersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllusersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
