import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWidgetPage } from './edit-widget.page';

describe('EditWidgetPage', () => {
  let component: EditWidgetPage;
  let fixture: ComponentFixture<EditWidgetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWidgetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWidgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
