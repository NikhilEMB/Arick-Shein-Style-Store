import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSmsPage } from './email-sms.page';

describe('EmailSmsPage', () => {
  let component: EmailSmsPage;
  let fixture: ComponentFixture<EmailSmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSmsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
