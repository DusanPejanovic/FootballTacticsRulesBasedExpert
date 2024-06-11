import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprinklerSystemDetailsPageComponent } from './sprinkler-system-details-page.component';

describe('SprinklerSystemDetailsPageComponent', () => {
  let component: SprinklerSystemDetailsPageComponent;
  let fixture: ComponentFixture<SprinklerSystemDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprinklerSystemDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprinklerSystemDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
