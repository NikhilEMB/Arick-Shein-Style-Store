import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilterPage } from './add-filter.page';

describe('AddFilterPage', () => {
  let component: AddFilterPage;
  let fixture: ComponentFixture<AddFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
