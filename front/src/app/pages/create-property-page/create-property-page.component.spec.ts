import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropertyPageComponent } from './create-property-page.component';

describe('CreatePropertyPageComponent', () => {
  let component: CreatePropertyPageComponent;
  let fixture: ComponentFixture<CreatePropertyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePropertyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePropertyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
