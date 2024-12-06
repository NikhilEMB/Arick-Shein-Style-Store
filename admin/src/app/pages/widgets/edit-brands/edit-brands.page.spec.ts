import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBrandsPage } from './edit-brands.page';

describe('EditBrandsPage', () => {
  let component: EditBrandsPage;
  let fixture: ComponentFixture<EditBrandsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBrandsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBrandsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
