import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesPage } from './branches.page';

describe('BranchesPage', () => {
  let component: BranchesPage;
  let fixture: ComponentFixture<BranchesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
