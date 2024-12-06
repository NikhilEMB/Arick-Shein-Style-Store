import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureListPage } from './feature-list.page';

describe('FeatureListPage', () => {
  let component: FeatureListPage;
  let fixture: ComponentFixture<FeatureListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
