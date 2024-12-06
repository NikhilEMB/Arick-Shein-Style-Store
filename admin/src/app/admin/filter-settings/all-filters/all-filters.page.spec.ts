import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFiltersPage } from './all-filters.page';

describe('AllFiltersPage', () => {
  let component: AllFiltersPage;
  let fixture: ComponentFixture<AllFiltersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFiltersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFiltersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
