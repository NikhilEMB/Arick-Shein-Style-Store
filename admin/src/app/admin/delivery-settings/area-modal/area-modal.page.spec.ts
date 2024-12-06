import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaModalPage } from './area-modal.page';

describe('AreaModalPage', () => {
  let component: AreaModalPage;
  let fixture: ComponentFixture<AreaModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
