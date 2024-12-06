import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServicesPage } from './edit-services.page';

describe('EditServicesPage', () => {
  let component: EditServicesPage;
  let fixture: ComponentFixture<EditServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditServicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
