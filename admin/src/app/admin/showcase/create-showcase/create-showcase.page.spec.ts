import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShowcasePage } from './create-showcase.page';

describe('CreateShowcasePage', () => {
  let component: CreateShowcasePage;
  let fixture: ComponentFixture<CreateShowcasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShowcasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShowcasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
