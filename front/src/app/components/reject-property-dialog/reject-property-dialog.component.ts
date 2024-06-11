import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-reject-property-dialog',
  templateUrl: './reject-property-dialog.component.html',
  styleUrls: ['./reject-property-dialog.component.css']
})
export class RejectPropertyDialogComponent {

  rejection = new FormControl(null, [Validators.required]);

  constructor(public dialogRef: MatDialogRef<RejectPropertyDialogComponent>) {

  }

  closeDialog(value: any){
    this.dialogRef.close(value);
  }
}
