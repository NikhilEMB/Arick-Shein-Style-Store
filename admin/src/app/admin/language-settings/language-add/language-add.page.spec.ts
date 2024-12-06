import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageAddPage } from './language-add.page';

describe('LanguageAddPage', () => {
  let component: LanguageAddPage;
  let fixture: ComponentFixture<LanguageAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
