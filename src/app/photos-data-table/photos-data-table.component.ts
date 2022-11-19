import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialog/dialog.component';
import { EditRecordDialogComponent } from '../edit-record-dialog/edit-record-dialog.component';
import { StateManagerService } from '../Services/state-manager.service';

@Component({
  selector: 'app-photos-data-table',
  templateUrl: './photos-data-table.component.html',
  styleUrls: ['./photos-data-table.component.scss']
})
export class PhotosDataTableComponent implements OnInit {

  @Input() photosData;
  displayedPhotosData = []; // shallow copy of photosData for filtering
  filterValue = '';         // for keeping the filter active after editing

  // -------------------------------------------------------------------
  constructor(public dialog: MatDialog, private stateManager: StateManagerService) { }
  // -------------------------------------------------------------------
  ngOnInit(): void {
    this.displayedPhotosData = this.photosData.filter(record => record);
  }
  // -------------------------------------------------------------------
  rowClicked(event, record) {
    event.stopPropagation();
    this.stateManager.chosenPhotoRecord = record;
  }
  // -------------------------------------------------------------------
  deleteRecord(event, index) {
    event.stopPropagation();
    this.openConfirmDialog(this.displayedPhotosData[index], index);
  }
  // -------------------------------------------------------------------
  editTitle(event, index) {
    event.stopPropagation();
    this.openEditDialog(this.displayedPhotosData[index], index);
  }
  // -------------------------------------------------------------------
  addNewRecord(event) {
    event.stopPropagation();
    this.openEditDialog({id:'', albumId:'', title:'', url:'', thumbnailUrl:''}, -1);
  }
  // -------------------------------------------------------------------
  filterTable(event) {
    this.filterValue = event.target.value;
    this.displayedPhotosData = this.photosData.filter(record => record['title'].includes(this.filterValue));
  }
  // -------------------------------------------------------------------
  openConfirmDialog(record, index) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Warning',
        message: `Record ID=${record['id']}, AlbumID=${record['albumId']} will be deleted!`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'Confirm') {
        this.photosData.splice(this.photosData.indexOf(this.displayedPhotosData[index]), 1);
        this.photosData = [...this.photosData]; // make Material CDK refresh UI
        this.displayedPhotosData = this.photosData.filter(record => record['title'].includes(this.filterValue));
      }
    });
  }
  // -------------------------------------------------------------------
  openEditDialog(record, index) {
    const dialogRef = this.dialog.open(EditRecordDialogComponent, {
      data: {
        id: record['id'],
        albumId: record['id'],
        title: record['title'],
        url: record['url'],
        thumbnailUrl: record['thumbnailUrl'],
        operation: index < 0  ? 'new' : 'title-edit'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== null && result !== undefined) {
        if(index >= 0) {
          record['title'] = result['title'];
        } else {
          this.photosData.splice(0, 0, result);   // add new record at index 0
          this.photosData = [...this.photosData]; // make Material CDK refresh UI
          this.displayedPhotosData = this.photosData.filter(record => record['title'].includes(this.filterValue));  
        }
      }
    });
  }
}
