import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryDetailsPageComponent } from './battery-details-page.component';

describe('BatteryDetailsPageComponent', () => {
  let component: BatteryDetailsPageComponent;
  let fixture: ComponentFixture<BatteryDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatteryDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
