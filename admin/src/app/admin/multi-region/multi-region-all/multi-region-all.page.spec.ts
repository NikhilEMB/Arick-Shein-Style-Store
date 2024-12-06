import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRegionAllPage } from './multi-region-all.page';

describe('MultiRegionAllPage', () => {
  let component: MultiRegionAllPage;
  let fixture: ComponentFixture<MultiRegionAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiRegionAllPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiRegionAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
