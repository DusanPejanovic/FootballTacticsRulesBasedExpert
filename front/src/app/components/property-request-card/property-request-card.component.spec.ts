import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRequestCardComponent } from './property-request-card.component';

describe('PropertyRequestCardComponent', () => {
  let component: PropertyRequestCardComponent;
  let fixture: ComponentFixture<PropertyRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyRequestCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
