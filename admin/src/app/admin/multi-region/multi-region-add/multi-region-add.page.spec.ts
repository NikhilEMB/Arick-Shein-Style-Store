import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRegionAddPage } from './multi-region-add.page';

describe('MultiRegionAddPage', () => {
  let component: MultiRegionAddPage;
  let fixture: ComponentFixture<MultiRegionAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiRegionAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiRegionAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
