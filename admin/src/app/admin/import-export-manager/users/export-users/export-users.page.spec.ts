import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportUsersPage } from './export-users.page';

describe('ExportUsersPage', () => {
  let component: ExportUsersPage;
  let fixture: ComponentFixture<ExportUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportUsersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
