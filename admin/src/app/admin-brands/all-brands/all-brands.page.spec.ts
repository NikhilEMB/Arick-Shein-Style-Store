import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBrandsPage } from './all-brands.page';

describe('AllBrandsPage', () => {
  let component: AllBrandsPage;
  let fixture: ComponentFixture<AllBrandsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBrandsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBrandsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
