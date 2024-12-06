import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFilterPage } from './select-filter.page';

describe('SelectFilterPage', () => {
  let component: SelectFilterPage;
  let fixture: ComponentFixture<SelectFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
