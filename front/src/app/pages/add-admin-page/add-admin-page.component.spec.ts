import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminPageComponent } from './add-admin-page.component';

describe('AddAdminPageComponent', () => {
  let component: AddAdminPageComponent;
  let fixture: ComponentFixture<AddAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
