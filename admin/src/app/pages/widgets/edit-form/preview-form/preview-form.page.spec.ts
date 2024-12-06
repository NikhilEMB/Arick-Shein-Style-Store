import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFormPage } from './preview-form.page';

describe('PreviewFormPage', () => {
  let component: PreviewFormPage;
  let fixture: ComponentFixture<PreviewFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
