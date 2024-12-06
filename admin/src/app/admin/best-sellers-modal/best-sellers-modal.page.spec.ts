import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellersModalPage } from './best-sellers-modal.page';

describe('BestSellersModalPage', () => {
  let component: BestSellersModalPage;
  let fixture: ComponentFixture<BestSellersModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestSellersModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellersModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
