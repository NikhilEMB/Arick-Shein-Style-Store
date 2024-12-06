import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAttributesPage } from './admin-attributes.page';

describe('AdminAttributesPage', () => {
  let component: AdminAttributesPage;
  let fixture: ComponentFixture<AdminAttributesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAttributesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAttributesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
