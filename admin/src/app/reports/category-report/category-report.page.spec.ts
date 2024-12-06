import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryReportPage } from './category-report.page';

describe('CategoryReportPage', () => {
  let component: CategoryReportPage;
  let fixture: ComponentFixture<CategoryReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
