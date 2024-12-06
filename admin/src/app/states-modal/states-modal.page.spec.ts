import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesModalPage } from './states-modal.page';

describe('StatesModalPage', () => {
  let component: StatesModalPage;
  let fixture: ComponentFixture<StatesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatesModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
