import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersReportPage } from './users-report.page';

describe('UsersReportPage', () => {
  let component: UsersReportPage;
  let fixture: ComponentFixture<UsersReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
