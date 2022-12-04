import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../dialog/dialog.component';
import { EditRecordDialogComponent } from '../edit-record-dialog/edit-record-dialog.component';
import { StateManagerService } from '../Services/state-manager.service';

export interface PhotoData {
  id: string;
  albumId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-table-material',
  templateUrl: './table-material.component.html',
  styleUrls: ['./table-material.component.scss']
})
export class TableMaterialComponent implements OnInit, AfterViewInit  {

  @Input() photosData;
  displayedColumns: string[] = ['id', 'albumId', 'title', 'picture', 'actions'];
  dataSource: MatTableDataSource<PhotoData>;
  displayedPhotosData = []; // shallow copy of photosData for filtering
  filterValue = '';         // for keeping the filter active after editing

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;  
  
  // -------------------------------------------------------------------
  constructor(public dialog: MatDialog, private stateManager: StateManagerService) {    
  }
  // -------------------------------------------------------------------
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // -------------------------------------------------------------------
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.photosData);
  }
  // -------------------------------------------------------------------
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // -------------------------------------------------------------------
  rowClicked(event, record) {
    event.stopPropagation();
    this.stateManager.chosenPhotoRecord = record;
  }
  // -------------------------------------------------------------------
  deleteRecord(event, row) {
    event.stopPropagation();
    this.openConfirmDialog(row, this.photosData.indexOf(row));
  }
  // -------------------------------------------------------------------
  editTitle(event, row) {
    event.stopPropagation();
    this.openEditDialog(row, this.photosData.indexOf(row));
  }
  // -------------------------------------------------------------------
  addNewRecord(event) {
    event.stopPropagation();
    this.openEditDialog({id:'', albumId:'', title:'', url:'', thumbnailUrl:''}, -1);
  }
  // -------------------------------------------------------------------
  // Filters by id or title
  // -------------------------------------------------------------------
  // filterTable(event) {
  //   this.filterValue = event.target.value;
  //   this.displayedPhotosData = this.photosData.filter(record =>
  //     record['title'].includes(this.filterValue) || record['id'].toString().includes(this.filterValue));
  // }
  // -------------------------------------------------------------------
  // opens a confirmation dialog for the delete operation with appropriate message
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
        this.photosData.splice(this.photosData.indexOf(this.photosData[index]), 1);
        this.dataSource.data = this.photosData;
      }
    });
  }
  // -------------------------------------------------------------------
  // opens an edit dialog. index < 0 is for new record, otherwise editing existing
  // -------------------------------------------------------------------
  openEditDialog(record, index) {
    const dialogRef = this.dialog.open(EditRecordDialogComponent, {
      data: {
        id: record['id'],
        albumId: record['albumId'],
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
          this.dataSource.data = this.photosData;
        }
      }
    });
  }

}
