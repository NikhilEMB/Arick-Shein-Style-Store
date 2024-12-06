import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSitemapPage } from './add-sitemap.page';

describe('AddSitemapPage', () => {
  let component: AddSitemapPage;
  let fixture: ComponentFixture<AddSitemapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSitemapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSitemapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
