import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemsPage } from './food-items.page';

describe('FoodItemsPage', () => {
  let component: FoodItemsPage;
  let fixture: ComponentFixture<FoodItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodItemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
