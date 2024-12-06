import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodesModalPage } from './pincodes-modal.page';

describe('PincodesModalPage', () => {
  let component: PincodesModalPage;
  let fixture: ComponentFixture<PincodesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PincodesModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PincodesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
