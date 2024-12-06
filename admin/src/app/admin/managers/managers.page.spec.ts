import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersPage } from './managers.page';

describe('ManagersPage', () => {
  let component: ManagersPage;
  let fixture: ComponentFixture<ManagersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
