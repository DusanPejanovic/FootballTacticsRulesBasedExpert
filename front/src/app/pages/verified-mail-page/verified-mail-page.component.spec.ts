import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedMailPageComponent } from './verified-mail-page.component';

describe('VerifiedMailPageComponent', () => {
  let component: VerifiedMailPageComponent;
  let fixture: ComponentFixture<VerifiedMailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedMailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedMailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
