import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class ConfirmDialogComponent {

  // A basic dialog asking confirmation for a delete operation
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}
