import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  id: string;
  albumId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  operation: 'new' | 'title-edit';
}

@Component({
  selector: 'app-edit-record-dialog',
  templateUrl: './edit-record-dialog.component.html',
  styleUrls: ['./edit-record-dialog.component.scss']
})
export class EditRecordDialogComponent {

  dialogTitle = '';

  // -------------------------------------------------------------------
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if(this.data.operation === 'new') {
      this.dialogTitle = 'Add New Record';
    }
    else {
      this.dialogTitle = 'Edit Title';
    }
  }

}
