import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapPage } from './sitemap.page';

describe('SitemapPage', () => {
  let component: SitemapPage;
  let fixture: ComponentFixture<SitemapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
