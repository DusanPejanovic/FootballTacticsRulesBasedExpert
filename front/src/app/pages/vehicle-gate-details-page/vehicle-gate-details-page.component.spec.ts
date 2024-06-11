import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleGateDetailsPageComponent } from './vehicle-gate-details-page.component';

describe('VehicleGateDetailsPageComponent', () => {
  let component: VehicleGateDetailsPageComponent;
  let fixture: ComponentFixture<VehicleGateDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleGateDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleGateDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
