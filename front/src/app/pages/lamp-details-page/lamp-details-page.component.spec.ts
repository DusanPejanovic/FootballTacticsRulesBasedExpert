import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LampDetailsPageComponent } from './lamp-details-page.component';

describe('LampDetailsPageComponent', () => {
  let component: LampDetailsPageComponent;
  let fixture: ComponentFixture<LampDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LampDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LampDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
