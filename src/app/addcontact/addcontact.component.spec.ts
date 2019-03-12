import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontactPage } from './addcontact.page';

describe('AddcontactPage', () => {
  let component: AddcontactPage;
  let fixture: ComponentFixture<AddcontactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcontactPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcontactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
