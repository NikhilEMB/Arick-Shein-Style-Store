import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInputPage } from './add-input.page';

describe('AddInputPage', () => {
  let component: AddInputPage;
  let fixture: ComponentFixture<AddInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInputPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
