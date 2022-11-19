import { Component, OnInit } from '@angular/core';
import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-main-host',
  templateUrl: './main-host.component.html',
  styleUrls: ['./main-host.component.scss']
})
export class MainHostComponent implements OnInit {

  photosData = null;

  // -------------------------------------------------------------------
  constructor(private httpClient:HttpService) { }
  // -------------------------------------------------------------------
  ngOnInit(): void {
    this.httpClient.dataReceived.subscribe(
      () => {
        this.photosData = this.httpClient.results;
      }
    );
    this.httpClient.getPhotosData();
  }

}
