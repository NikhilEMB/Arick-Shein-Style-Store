import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupDropPage } from './pickup-drop.page';

describe('PickupDropPage', () => {
  let component: PickupDropPage;
  let fixture: ComponentFixture<PickupDropPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupDropPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupDropPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
