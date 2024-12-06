import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPointsPage } from './add-points.page';

describe('AddPointsPage', () => {
  let component: AddPointsPage;
  let fixture: ComponentFixture<AddPointsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPointsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
