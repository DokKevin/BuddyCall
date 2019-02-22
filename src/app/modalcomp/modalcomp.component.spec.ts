import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcompPage } from './modalcomp.page';

describe('ModalcompPage', () => {
  let component: ModalcompPage;
  let fixture: ComponentFixture<ModalcompPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcompPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcompPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
