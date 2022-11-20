import { Component, Input, OnInit } from '@angular/core';
import { StateManagerService } from '../Services/state-manager.service';

@Component({
  selector: 'app-large-photo',
  templateUrl: './large-photo.component.html',
  styleUrls: ['./large-photo.component.scss']
})
export class LargePhotoComponent implements OnInit {

  // This component represents the large photo
  // It was implemented separately from the table component to allow better future maintainability

  constructor(public stateManager: StateManagerService) { }

  ngOnInit(): void {
  }

}
