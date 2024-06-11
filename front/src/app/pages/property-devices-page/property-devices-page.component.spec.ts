import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDevicesPageComponent } from './property-devices-page.component';

describe('PropertyDevicesPageComponent', () => {
  let component: PropertyDevicesPageComponent;
  let fixture: ComponentFixture<PropertyDevicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyDevicesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyDevicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
