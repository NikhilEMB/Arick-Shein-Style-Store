import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteSeoPage } from './website-seo.page';

describe('WebsiteSeoPage', () => {
  let component: WebsiteSeoPage;
  let fixture: ComponentFixture<WebsiteSeoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteSeoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteSeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
