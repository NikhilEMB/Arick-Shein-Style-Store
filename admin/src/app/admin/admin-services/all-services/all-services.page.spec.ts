import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServicesPage } from './all-services.page';

describe('AllServicesPage', () => {
  let component: AllServicesPage;
  let fixture: ComponentFixture<AllServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllServicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
