import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCurrentPage } from './language-current.page';

describe('LanguageCurrentPage', () => {
  let component: LanguageCurrentPage;
  let fixture: ComponentFixture<LanguageCurrentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageCurrentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageCurrentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
