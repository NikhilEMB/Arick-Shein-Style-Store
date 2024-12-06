import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrandPage } from './add-brand.page';

describe('AddBrandPage', () => {
  let component: AddBrandPage;
  let fixture: ComponentFixture<AddBrandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBrandPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBrandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
