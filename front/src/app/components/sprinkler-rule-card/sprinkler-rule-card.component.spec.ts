import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprinklerRuleCardComponent } from './sprinkler-rule-card.component';

describe('SprinklerRuleCardComponent', () => {
  let component: SprinklerRuleCardComponent;
  let fixture: ComponentFixture<SprinklerRuleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprinklerRuleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprinklerRuleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
