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

  // This component is a dialog for adding a new record OR for editing an existing
  // Mode determined by the DialogData parameter
  // Editing title dialog presents the rest of the record data disabled for better user experience
  // Input validation currently not implemented

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
