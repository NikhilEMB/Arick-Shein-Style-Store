import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoUserAccessPage } from './no-user-access.page';

describe('NoUserAccessPage', () => {
  let component: NoUserAccessPage;
  let fixture: ComponentFixture<NoUserAccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoUserAccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoUserAccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
