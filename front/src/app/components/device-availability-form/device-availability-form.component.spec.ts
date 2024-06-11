import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAvailabilityFormComponent } from './device-availability-form.component';

describe('DeviceAvailabilityFormComponent', () => {
  let component: DeviceAvailabilityFormComponent;
  let fixture: ComponentFixture<DeviceAvailabilityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceAvailabilityFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceAvailabilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
