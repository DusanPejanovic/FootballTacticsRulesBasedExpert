import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-two-action-snackbar',
  templateUrl: './two-action-snackbar.component.html',
  styleUrls: ['./two-action-snackbar.component.css']
})
export class TwoActionSnackbarComponent {

  constructor(public snackBarRef: MatSnackBarRef<TwoActionSnackbarComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: {message: string, button1: string, button2: string, callback1: () => {}, callback2: () => {}}) {
  }

  action1(){
    this.data.callback1();
    this.snackBarRef.dismissWithAction();
  }

  action2(){
    this.data.callback2();
    this.snackBarRef.dismissWithAction();
  }
}
