import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportsPage } from './sales-reports.page';

describe('SalesReportsPage', () => {
  let component: SalesReportsPage;
  let fixture: ComponentFixture<SalesReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReportsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
