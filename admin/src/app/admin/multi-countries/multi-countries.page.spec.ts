import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCountriesPage } from './multi-countries.page';

describe('MultiCountriesPage', () => {
  let component: MultiCountriesPage;
  let fixture: ComponentFixture<MultiCountriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiCountriesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCountriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
