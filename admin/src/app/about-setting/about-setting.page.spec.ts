import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSettingPage } from './about-setting.page';

describe('AboutSettingPage', () => {
  let component: AboutSettingPage;
  let fixture: ComponentFixture<AboutSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSettingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
