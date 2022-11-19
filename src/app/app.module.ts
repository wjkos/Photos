import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { PhotosDataTableComponent } from './photos-data-table/photos-data-table.component';
import { HttpService } from './Services/http.service';
import { MainHostComponent } from './main-host/main-host.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LargePhotoComponent } from './large-photo/large-photo.component';
import { EditRecordDialogComponent } from './edit-record-dialog/edit-record-dialog.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    PhotosDataTableComponent,
    MainHostComponent,
    ConfirmDialogComponent,
    LargePhotoComponent,
    EditRecordDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ScrollingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
