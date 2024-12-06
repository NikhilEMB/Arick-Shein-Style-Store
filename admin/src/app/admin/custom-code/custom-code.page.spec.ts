import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCodePage } from './custom-code.page';

describe('CustomCodePage', () => {
  let component: CustomCodePage;
  let fixture: ComponentFixture<CustomCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
