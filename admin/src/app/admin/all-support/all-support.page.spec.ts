import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSupportPage } from './all-support.page';

describe('AllSupportPage', () => {
  let component: AllSupportPage;
  let fixture: ComponentFixture<AllSupportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSupportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
