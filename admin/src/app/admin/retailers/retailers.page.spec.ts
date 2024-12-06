import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailersPage } from './retailers.page';

describe('RetailersPage', () => {
  let component: RetailersPage;
  let fixture: ComponentFixture<RetailersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
