import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationChatPage } from './quotation-chat.page';

describe('QuotationChatPage', () => {
  let component: QuotationChatPage;
  let fixture: ComponentFixture<QuotationChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
