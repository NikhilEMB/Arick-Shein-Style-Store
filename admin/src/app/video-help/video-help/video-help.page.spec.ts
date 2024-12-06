import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoHelpPage } from './video-help.page';

describe('VideoHelpPage', () => {
  let component: VideoHelpPage;
  let fixture: ComponentFixture<VideoHelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoHelpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
