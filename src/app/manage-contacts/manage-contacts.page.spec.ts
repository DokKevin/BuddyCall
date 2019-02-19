import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContactsPage } from './manage-contacts.page';

describe('ManageContactsPage', () => {
  let component: ManageContactsPage;
  let fixture: ComponentFixture<ManageContactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageContactsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
