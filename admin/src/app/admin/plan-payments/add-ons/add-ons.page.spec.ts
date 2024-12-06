import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnsPage } from './add-ons.page';

describe('AddOnsPage', () => {
  let component: AddOnsPage;
  let fixture: ComponentFixture<AddOnsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOnsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
