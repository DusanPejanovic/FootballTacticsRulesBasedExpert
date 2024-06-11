import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoActionSnackbarComponent } from './two-action-snackbar.component';

describe('TwoActionSnackbarComponent', () => {
  let component: TwoActionSnackbarComponent;
  let fixture: ComponentFixture<TwoActionSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoActionSnackbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoActionSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
