import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLanguagePage } from './custom-language.page';

describe('CustomLanguagePage', () => {
  let component: CustomLanguagePage;
  let fixture: ComponentFixture<CustomLanguagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomLanguagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLanguagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
