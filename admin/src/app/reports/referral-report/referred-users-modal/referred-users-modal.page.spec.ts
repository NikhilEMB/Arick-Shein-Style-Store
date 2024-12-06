import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferredUsersModalPage } from './referred-users-modal.page';

describe('ReferredUsersModalPage', () => {
  let component: ReferredUsersModalPage;
  let fixture: ComponentFixture<ReferredUsersModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferredUsersModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferredUsersModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
