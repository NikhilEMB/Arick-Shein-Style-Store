import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersModalPage } from './users-modal.page';

describe('UsersModalPage', () => {
  let component: UsersModalPage;
  let fixture: ComponentFixture<UsersModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
