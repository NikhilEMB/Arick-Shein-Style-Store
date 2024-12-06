import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUsagePage } from './app-usage.page';

describe('AppUsagePage', () => {
  let component: AppUsagePage;
  let fixture: ComponentFixture<AppUsagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUsagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUsagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
