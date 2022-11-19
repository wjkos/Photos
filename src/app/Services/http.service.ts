import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  photosUrl = 'https://jsonplaceholder.typicode.com/photos';
  results;
  dataReceived = new Subject<void>();
    
  // -------------------------------------------------------------------
  constructor(private http: HttpClient) {}
  // -------------------------------------------------------------------
  getPhotosData() {
    this.http.get(this.photosUrl).subscribe(data => {
        this.results = data;
        this.dataReceived.next();
      }
    );
    return this.results;
  }
}
