import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRolesPage } from './manage-roles.page';

describe('ManageRolesPage', () => {
  let component: ManageRolesPage;
  let fixture: ComponentFixture<ManageRolesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRolesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRolesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
