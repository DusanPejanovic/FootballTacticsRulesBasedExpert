import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleWhitelistItemComponent } from './vehicle-whitelist-item.component';

describe('VehicleWhitelistItemComponent', () => {
  let component: VehicleWhitelistItemComponent;
  let fixture: ComponentFixture<VehicleWhitelistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleWhitelistItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleWhitelistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
