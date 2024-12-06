import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTabPage } from './admin-tab.page';

describe('AdminTabPage', () => {
  let component: AdminTabPage;
  let fixture: ComponentFixture<AdminTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
