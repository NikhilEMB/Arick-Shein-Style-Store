import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportUsersPage } from './import-users.page';

describe('ImportUsersPage', () => {
  let component: ImportUsersPage;
  let fixture: ComponentFixture<ImportUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportUsersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
