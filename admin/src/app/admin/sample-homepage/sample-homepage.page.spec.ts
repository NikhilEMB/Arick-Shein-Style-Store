import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleHomepagePage } from './sample-homepage.page';

describe('SampleHomepagePage', () => {
  let component: SampleHomepagePage;
  let fixture: ComponentFixture<SampleHomepagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleHomepagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleHomepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
