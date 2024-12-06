import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesSettingPage } from './pages-setting.page';

describe('PagesSettingPage', () => {
  let component: PagesSettingPage;
  let fixture: ComponentFixture<PagesSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesSettingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
