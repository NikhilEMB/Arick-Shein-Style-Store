import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVendorsPage } from './edit-vendors.page';

describe('EditVendorsPage', () => {
  let component: EditVendorsPage;
  let fixture: ComponentFixture<EditVendorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVendorsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVendorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
