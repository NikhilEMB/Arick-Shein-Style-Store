import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFoodItemPage } from './create-food-item.page';

describe('CreateFoodItemPage', () => {
  let component: CreateFoodItemPage;
  let fixture: ComponentFixture<CreateFoodItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFoodItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFoodItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
