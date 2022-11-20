import { Component, OnInit } from '@angular/core';
import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-main-host',
  templateUrl: './main-host.component.html',
  styleUrls: ['./main-host.component.scss']
})
export class MainHostComponent implements OnInit {

  // The main hosting component of the app. 
  // Keeps the Angular AppComponent slim for future changes.

  photosData = null;  // holds the array of photos retrieved from server

  // -------------------------------------------------------------------
  constructor(private httpClient:HttpService) { }
  // -------------------------------------------------------------------
  ngOnInit(): void {
    this.httpClient.dataReceived.subscribe( // subscribes for the event of server response
      () => {
        this.photosData = this.httpClient.results;
      }
    );
    this.httpClient.getPhotosData(); // triggers data retrieval from the server
  }

}
