import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaReportPage } from './area-report.page';

describe('AreaReportPage', () => {
  let component: AreaReportPage;
  let fixture: ComponentFixture<AreaReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
