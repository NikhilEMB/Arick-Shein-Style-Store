import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerLinkingModalPage } from './banner-linking-modal.page';

describe('BannerLinkingModalPage', () => {
  let component: BannerLinkingModalPage;
  let fixture: ComponentFixture<BannerLinkingModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerLinkingModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerLinkingModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
