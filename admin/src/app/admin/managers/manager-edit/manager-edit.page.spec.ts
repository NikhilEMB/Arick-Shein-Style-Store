import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEditPage } from './manager-edit.page';

describe('ManagerEditPage', () => {
  let component: ManagerEditPage;
  let fixture: ComponentFixture<ManagerEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
