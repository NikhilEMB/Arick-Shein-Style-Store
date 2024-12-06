import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchModalPage } from './branch-modal.page';

describe('BranchModalPage', () => {
  let component: BranchModalPage;
  let fixture: ComponentFixture<BranchModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
