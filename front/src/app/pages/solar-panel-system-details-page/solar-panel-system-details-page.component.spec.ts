import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarPanelSystemDetailsPageComponent } from './solar-panel-system-details-page.component';

describe('SolarPanelSystemDetailsPageComponent', () => {
  let component: SolarPanelSystemDetailsPageComponent;
  let fixture: ComponentFixture<SolarPanelSystemDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarPanelSystemDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolarPanelSystemDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
