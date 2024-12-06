import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingApprovalPage } from './rating-approval.page';

describe('RatingApprovalPage', () => {
  let component: RatingApprovalPage;
  let fixture: ComponentFixture<RatingApprovalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingApprovalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingApprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
