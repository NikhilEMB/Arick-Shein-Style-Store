import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermPolicyPage } from './term-policy.page';

describe('TermPolicyPage', () => {
  let component: TermPolicyPage;
  let fixture: ComponentFixture<TermPolicyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermPolicyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
